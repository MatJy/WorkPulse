'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { DeleteSession } from './actions';
import Modal from './modal';

type Break = {
    id: number;
    session_id: number;
    name: string;
    length: number;
    created_at: string;
    order: number;
};

type SessionsBreaks = {
    breaks: Break[];
    session: {
        id: number;
        user_id: number;
        created_at: string;
        name: string;
        break_interval: number;
        length: number;
        minutes_worked: number | null;
    };
};

export default function RealtimeSessionsBreaks({
    sessionBreaks,
}: {
    sessionBreaks: SessionsBreaks[];
}) {
    const [data, setData] = useState(sessionBreaks);
    const [selectedSession, setSelectedSession] =
        useState<SessionsBreaks | null>(null);
    const [showModal, setShowModal] = useState(false);

    const supabase = createClient();

    async function fetchSessionsAndBreaks() {
        const { data: freshSessions, error } = await supabase
            .from('workSession')
            .select(`*, Break(*)`)
            .order('created_at', { ascending: false });

        if (!error && freshSessions) {
            // Muokkaa data muotoon SessionsBreaks[]
            const formattedData: SessionsBreaks[] = freshSessions.map(
                (session) => ({
                    session: {
                        id: session.id,
                        user_id: session.user_id,
                        created_at: session.created_at,
                        name: session.name,
                        break_interval: session.break_interval,
                        length: session.length,
                        minutes_worked: session.minutes_worked,
                    },
                    breaks: session.Break || [],
                })
            );

            setData(formattedData);
        } else {
            console.error('Failed to fetch sessions & breaks:', error);
        }
    }

    useEffect(() => {
        const channel = supabase.channel('realtime sessions');

        // Kutsu aina fetchia kun data muuttuu
        const handler = () => {
            fetchSessionsAndBreaks();
        };

        channel
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'Break' },
                handler
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'workSession' },
                handler
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    function toHours(totalMinutes: number) {
        const length = totalMinutes / 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (Number.isInteger(length)) {
            if (hours > 1) {
                return length + ' hours';
            }
            return length + ' hour';
        } else {
            if (hours > 1) {
                return hours + ' hours ' + minutes + ' minutes';
            } else if (hours === 0) {
                return minutes + ' minutes';
            }
            return hours + ' hour ' + minutes + ' minutes';
        }
    }

    function formatDate(date: string | null) {
        if (!date) return '';
        const toArray = date.split('T');
        const yearMonthDay = toArray[0].split('-');
        return yearMonthDay[2] + '.' + yearMonthDay[1] + '.' + yearMonthDay[0];
    }

    return (
        <main>
            {showModal && selectedSession && (
                <Modal
                    sessionData={selectedSession}
                    onClose={() => setShowModal(false)}
                />
            )}

            {data
                .filter((item) => item.breaks.length > 0)
                .map((item, i) => (
                    <div key={i} className="p-2">
                        <div className="flex flex-col bg-white max-w-100 rounded-md py-3 px-6 border">
                            <h3 className="text-base font-semibold text-gray-900">
                                {item.session.name}
                            </h3>
                            <p className="text-sm text-gray-500 pb-3">
                                Length: {toHours(item.session.length)}
                            </p>
                            <div className="flex gap-2 text-sm text-gray-500 pb-2">
                                <p>created at:</p>
                                <p>{formatDate(item.session.created_at)}</p>
                            </div>
                            <p className="text-sm text-gray-500 pb-3">
                                Break every{' '}
                                {toHours(item.session.break_interval)}
                            </p>
                            <h2 className="font-semibold text-md text-gray-900">
                                Breaks
                            </h2>
                            <div className="border-b">
                                {item.breaks.map((brk, j) => (
                                    <div key={j}>
                                        <p className="text-sm text-gray-500">
                                            Break {j + 1}: {brk.name}
                                        </p>
                                        <p className="text-sm text-gray-500 pb-3">
                                            Length: {brk.length} min
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-around items-center py-3">
                                <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                    <button
                                        className="font-semibold text-sm text-green-700 hover:cursor-pointer flex gap-1 items-center"
                                        onClick={() => {
                                            setSelectedSession(item);
                                            setShowModal(true);
                                        }}
                                    >
                                        <svg
                                            className="w-6 stroke-green-700"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                        Edit
                                    </button>
                                </div>

                                <div className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                    <button
                                        className="font-semibold text-sm text-red-700 hover:cursor-pointer flex gap-1 items-center"
                                        onClick={() =>
                                            DeleteSession(item.session.id)
                                        }
                                    >
                                        <svg
                                            className="w-6 stroke-red-700"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line
                                                x1="10"
                                                y1="11"
                                                x2="10"
                                                y2="17"
                                            ></line>
                                            <line
                                                x1="14"
                                                y1="11"
                                                x2="14"
                                                y2="17"
                                            ></line>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </main>
    );
}
