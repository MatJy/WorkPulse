'use server';
import { redirect } from 'next/navigation';
import { FetchSessionBreaksById } from './actions';
import SessionTimer from '@/app/components/sessionTimer';
import { RequestNotificationPermission } from '@/app/components/requestNotifPremission';
import BreakTimers from '@/app/components/breakTimers';

type Props = {
    params: { id: string };
};
export default async function SessionPage({ params }: Props) {
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
    console.log(
        'Kaikki breakit, nimet: ' +
            allBreaksName +
            'Kaikki breakit, ajat ' +
            allBreaksLen
    );

    return (
        <main className="min-h-screen bg-gray-900 text-white">
            <RequestNotificationPermission />
            <div
                className="p-2
            "
            >
                <button className="inline-flex cursor-pointer items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                    End session
                </button>
            </div>

            <div className="grid items-center justify-center py-24">
                <SessionTimer initialMinutes={length} />
                {}
                <BreakTimers
                    breakInterval={data.session.break_interval}
                    breakLength={allBreaksLen}
                    breakName={allBreaksName}
                />
            </div>
        </main>
    );
}
