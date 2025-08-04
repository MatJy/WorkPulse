'use server';
import { redirect } from 'next/navigation';
import { FetchSessionBreaksById } from './actions';
import Timer from '@/app/components/timer';
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
        <main className="flex items-center justify-center min-h-screen bg-gray-900">
            <Timer initialMinutes={length} />
        </main>
    );
}
