'use client';
import { useEffect, useState } from 'react';

type TimerProps = {
    initialMinutes: number;
};

const Timer = ({ initialMinutes }: TimerProps) => {
    const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (totalSeconds <= 0) return;

        const interval = setInterval(() => {
            setTotalSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [totalSeconds]);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    const counterLabel = `${paddedHours} hours ${paddedMinutes} minutes ${paddedSeconds} seconds`;

    if (totalSeconds <= 0) {
        return <div className="p-4 text-center">⏱️ Time&apos;s up!</div>;
    }

    return (
        <div
            className="grid grid-flow-col gap-5 text-center auto-cols-max p-2"
            aria-label={counterLabel}
        >
            <div className="flex flex-col p-2 bg-black rounded-md text-neutral-content text-white text-7xl">
                <span className="countdown font-mono text-9xl">
                    <span
                        style={
                            { '--value': paddedHours } as React.CSSProperties
                        }
                        aria-live="polite"
                        aria-label={`${paddedHours} hours`}
                    >
                        {paddedHours}
                    </span>
                </span>
                hours
            </div>
            <div className="flex flex-col p-2 bg-black rounded-md text-neutral-content text-white text-7xl">
                <span className="countdown font-mono text-9xl">
                    <span
                        style={
                            { '--value': paddedMinutes } as React.CSSProperties
                        }
                        aria-live="polite"
                        aria-label={`${paddedMinutes} minutes`}
                    >
                        {paddedMinutes}
                    </span>
                </span>
                min
            </div>
            <div className="flex flex-col p-2 bg-black rounded-md text-neutral-content text-white text-7xl">
                <span className="countdown font-mono text-9xl">
                    <span
                        style={
                            { '--value': paddedSeconds } as React.CSSProperties
                        }
                        aria-live="polite"
                        aria-label={`${paddedSeconds} seconds`}
                    >
                        {paddedSeconds}
                    </span>
                </span>
                sec
            </div>
        </div>
    );
};

export default Timer;
