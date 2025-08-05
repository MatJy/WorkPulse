'use client';

import { useState } from 'react';
import Timer from './timer';

type TimerProps = {
    breakLength: number;
};

export default function BreakTimer({ breakLength }: TimerProps) {
    const [secondsLeft, setSecondsLeft] = useState(breakLength * 60);

    if (secondsLeft <= 0) {
        return <div className="p-4 text-center">⏱️ Time&apos;s up!</div>;
    }

    return <Timer time={breakLength} />;
}
