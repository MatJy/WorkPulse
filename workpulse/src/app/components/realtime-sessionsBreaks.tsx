'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { CreateWorkLog, DeleteSession } from './actions';
import Modal from './modal';
import { SessionsBreaks } from '../types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

    const router = useRouter();

    async function handleStartSession(sessionId: number) {
        try {
            const newLogId = await CreateWorkLog(sessionId);
            // Jos CreateWorkLog palauttaa logId:n, ohjataan sen session sivulle:
            router.push(`/session/${sessionId}`);
        } catch (error) {
            console.error('Failed to create work log:', error);
            // Halutessasi näytä virheilmoitus käyttäjälle
        }
    }

    async function fetchSessionsAndBreaks() {
        const { data: freshSessions, error } = await supabase
            .from('workSession')
            .select(`*, Break(*), work_logs(*)`)
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
                    logs: session.work_logs || [],
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
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'work_logs' },
                handler
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    });

    function toHours(totalMinutes: number) {
        const length = totalMinutes / 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (Number.isInteger(length)) {
            if (hours > 1 || hours === 0) {
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
                    <div key={i} className="p-4">
                        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl border border-gray-200 p-6 max-w-xl  space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-sky-800">
                                    {item.session.name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {formatDate(item.session.created_at)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Session length
                                    </p>
                                    <p>{toHours(item.session.length)}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Break every
                                    </p>
                                    <p>
                                        {toHours(item.session.break_interval)}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Time worked
                                    </p>
                                    <p>
                                        {item.session.minutes_worked != null
                                            ? toHours(
                                                  item.session.minutes_worked
                                              )
                                            : 0}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-md text-gray-800 mb-2">
                                    Breaks
                                </h4>
                                <div className="divide-y border rounded-md">
                                    {item.breaks.map((brk, j) => (
                                        <div key={j} className="p-2">
                                            <p className="text-gray-700 font-medium">
                                                Break {j + 1}: {brk.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Length: {brk.length} min
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="md:flex justify-between items-center pt-4">
                                <button
                                    onClick={() =>
                                        handleStartSession(item.session.id)
                                    }
                                    className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80 cursor-pointer"
                                >
                                    Start session
                                </button>

                                <div className="flex gap-4 pt-5">
                                    <button
                                        className="font-semibold text-sm text-green-700 flex gap-1 items-center hover:scale-105 transition cursor-pointer"
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

                                    <button
                                        className="font-semibold text-sm text-red-700 flex gap-1 items-center hover:scale-105 transition cursor-pointer"
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
