'use server';
import { redirect } from 'next/navigation';
import { FetchSessionBreaksById } from './actions';
import SessionTimer from '@/app/components/sessionTimer';
import { RequestNotificationPermission } from '@/app/components/requestNotifPremission';
import BreakTimers from '@/app/components/breakTimers';
import Link from 'next/link';
import EndSessionButton from '@/app/components/endSessionButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SessionPage({ params }: any) {
    const { id } = await params;
    const data = await FetchSessionBreaksById(Number(id));
    if (Array.isArray(data)) {
        redirect('/error');
    }

    const length = data.session.length;
    const allBreaksLen = [];
    const allBreaksName = [];
    for (const breakData of data.breaks) {
        allBreaksLen.push(breakData.length);
        allBreaksName.push(breakData.name);
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white">
            <RequestNotificationPermission />
            <div
                className="p-2
            "
            >
                <Link href={'/home'}>
                    <EndSessionButton logId={data.logs[0].id} />
                </Link>
            </div>

            <div className="grid items-center justify-center py-24">
                <SessionTimer initialMinutes={length} />
                <BreakTimers
                    breakInterval={data.session.break_interval}
                    breakLength={allBreaksLen}
                    breakName={allBreaksName}
                />
            </div>
        </main>
    );
}
