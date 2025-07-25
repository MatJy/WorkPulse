import { signOut } from '../logout/actions';
import ShowModal from '../components/showModal';
import Profile from '../components/profile';
import { FetchSessionsWithBreaks } from '../components/actions';
import RealtimeSessionsBreaks from '../components/realtime-sessionsBreaks';

export default async function Home() {
    const data1 = await FetchSessionsWithBreaks();

    return (
        <main>
            <div className="p-10">
                <Profile />
            </div>
            <div className="p-10">
                <RealtimeSessionsBreaks sessionBreaks={data1} />
            </div>
            <button onClick={signOut} className="cursor-pointer">
                Sign out
            </button>
            <br />
            <ShowModal />
        </main>
    );
}
