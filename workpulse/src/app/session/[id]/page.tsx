'use server';
import { redirect } from 'next/navigation';
import { FetchSessionBreaksById } from './actions';
import SessionTimer from '@/app/components/sessionTimer';
import NextBreakTimer from '@/app/components/nextBreakTimer';
import { RequestNotificationPermission } from '@/app/components/requestNotifPremission';

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

    return (
        <main className="min-h-screen bg-gray-900 text-white">
            <RequestNotificationPermission />
            <div className="w-10">
                <button className="">End session</button>
            </div>
            <div className="grid items-center justify-center py-24">
                <SessionTimer initialMinutes={length} />
                <NextBreakTimer
                    breakInterval={data.session.break_interval}
                    breakLength={data.breaks[0].length}
                    breakName={data.breaks[0].name}
                />
            </div>
        </main>
    );
}
