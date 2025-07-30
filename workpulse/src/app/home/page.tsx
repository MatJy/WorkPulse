import { signOut } from '../logout/actions';
import Profile from '../components/profile';
import { FetchSessionsWithBreaks } from '../components/actions';
import RealtimeSessionsBreaks from '../components/realtime-sessionsBreaks';
import PortalModal from '../components/showModal';

export default async function Home() {
    const data = await FetchSessionsWithBreaks();

    return (
        <main>
            <div className="p-10 justify-items-end">
                <Profile />
            </div>
            <div className="p-10">
                <RealtimeSessionsBreaks sessionBreaks={data} />
            </div>
            <button onClick={signOut} className="cursor-pointer">
                Sign out
            </button>
            <br />
            <div className="">
                <PortalModal />
            </div>
        </main>
    );
}
