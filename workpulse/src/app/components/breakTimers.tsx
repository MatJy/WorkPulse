'use client';
import { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { showNotification } from './notification';

type TimerProps = {
    breakInterval: number;
    breakLength: Array<number>;
    breakName: string[];
};

export default function BreakTimers({
    breakInterval,
    breakLength,
    breakName,
}: TimerProps) {
    const indexRef = useRef(0);
    const [secondsLeft, setSecondsLeft] = useState(breakInterval * 60);
    const [breakSecondsLeft, setBreakSecondsLeft] = useState(
        breakLength[indexRef.current] * 60
    );
    const [isBreak, setIsBreak] = useState(false);
    const currentBreak = breakLength[indexRef.current];

    useEffect(() => {
        if (!isBreak && secondsLeft <= 0) {
            showNotification('Break time! ' + breakName[indexRef.current]);
            setIsBreak(true);
            setBreakSecondsLeft(breakLength[indexRef.current] * 60);
        }
    }, [secondsLeft, breakLength, breakName, isBreak, currentBreak]);

    useEffect(() => {
        if (isBreak && breakSecondsLeft <= 0) {
            showNotification('Break over!!');
            setIsBreak(false);
            setSecondsLeft(breakInterval * 60);
            indexRef.current += 1;
        }
    }, [isBreak, breakSecondsLeft, breakInterval, breakLength]);

    if (currentBreak === undefined) {
        return (
            <main className="pt-10 text-center">
                <h2 className="text-4xl">
                    All breaks completed, a little bit of work left 🎉
                </h2>
            </main>
        );
    }
    return (
        <main className="pt-10 text-center">
            <h2 className="text-4xl">
                {isBreak ? 'Break ends in' : 'Next break in'}
            </h2>
            <Timer
                key={
                    isBreak
                        ? `break-${indexRef.current}`
                        : `work-${indexRef.current}`
                }
                time={isBreak ? currentBreak : breakInterval}
                onTick={isBreak ? setBreakSecondsLeft : setSecondsLeft}
            />
        </main>
    );
}
