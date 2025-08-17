import Profile from '../components/profile';
import { FetchSessionsWithBreaks } from '../components/actions';
import RealtimeSessionsBreaks from '../components/realtime-sessionsBreaks';
import PortalModal from '../components/showModal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Home() {
  const data = await FetchSessionsWithBreaks();

  return (
    <main className='min-h-screen bg-gradient-to-br from-sky-100 to-blue-200  p-6'>
      {/* Profiili */}
      <div className='flex justify-end'>
        <div className=' p-4 rounded-lg md:fixed'>
          <Profile />
        </div>
      </div>

      {/* Otsikko + Session-lista */}
      <section className='max-w-4xl mx-auto mt-12'>
        <h1 className='text-3xl font-bold mb-6 text-center text-blue-950'>
          Workpulse Dashboard
        </h1>
        <div className='bg-blue-200 rounded-lg shadow-xl p-6'>
          <RealtimeSessionsBreaks sessionBreaks={data} />
        </div>
      </section>

      {/* Modal */}
      <section className='fixed bottom-10 right-10'>
        <PortalModal />
      </section>
    </main>
  );
}
