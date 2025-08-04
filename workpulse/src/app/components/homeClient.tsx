'use client';

import { useState } from 'react';
import RealtimeSessionsBreaks from '../components/realtime-sessionsBreaks';
import Modal from '../components/modal';
import Profile from '../components/profile';
import { DeleteSession } from '../components/actions';
import { SessionsBreaks } from '../types';

export default function ClientHome({
    sessionBreaks,
}: {
    sessionBreaks: SessionsBreaks[];
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main>
            <div className="p-10 justify-items-end">
                <Profile />
            </div>

            <div className="p-10">
                <RealtimeSessionsBreaks sessionBreaks={sessionBreaks} />
            </div>

            <button onClick={() => setIsModalOpen(true)}>
                Create work session
            </button>

            <Modal onClose={() => setIsModalOpen(false)} />
        </main>
    );
}
