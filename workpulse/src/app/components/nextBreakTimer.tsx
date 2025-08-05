'use client';
import { useEffect, useState } from 'react';
import Timer from './timer';
import BreakTimer from './breakTimer';
import { showNotification } from './notification';

type TimerProps = {
    breakInterval: number;
    breakLength: number;
    breakName: string;
};

export default function NextBreakTimer({
    breakInterval,
    breakLength,
    breakName,
}: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(breakInterval * 60);

    useEffect(() => {
        if (secondsLeft <= 0) {
            // Näytetään ilmoitus vain kerran, kun tauko alkaa
            showNotification(breakName);
        }
    }, [secondsLeft, breakLength, breakName]);

    if (secondsLeft <= 0) {
        return (
            <main className="pt-10 text-center">
                <h2 className="text-4xl">Break ends in</h2>
                <BreakTimer breakLength={0.2} />
            </main>
        );
    }

    return (
        <main className="pt-10 text-center">
            <h2 className="text-4xl">Next break in</h2>
            <Timer time={0.1} onTick={setSecondsLeft} />;
        </main>
    );
}
