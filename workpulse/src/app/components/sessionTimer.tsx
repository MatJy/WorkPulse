'use client';
import { useEffect, useState } from 'react';
import Timer from './timer';
import Router from 'next/router';
import Link from 'next/link';

type TimerProps = {
    initialMinutes: number;
};

const SessionTimer = ({ initialMinutes }: TimerProps) => {
    const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

    if (secondsLeft <= 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Work session is complete!
                </h2>
                <p className="text-lg mb-8">
                    Good job! Now you can return to the home page
                </p>
                <Link href={'/home'}>
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg shadow hover:scale-105 transition cursor-pointer">
                        Return to home page
                    </button>
                </Link>
            </div>
        );
    }

    return <Timer time={initialMinutes} onTick={setSecondsLeft} />;
};

export default SessionTimer;
