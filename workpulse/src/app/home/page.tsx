import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { signOut } from '../logout/actions';
import ShowModal from '../components/showModal';
import Profile from '../components/profile';
import SessionCard from '../components/sessionCard';

export default async function Home() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <main>
            <div className="p-10">
                <Profile />
            </div>
            <div className="p-10">
                <SessionCard />
            </div>
            <button onClick={signOut} className="cursor-pointer">
                Sign out
            </button>
            <br />
            <ShowModal />
        </main>
    );
}
