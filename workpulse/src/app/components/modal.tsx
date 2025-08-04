import { useEffect, useState } from 'react';
import ModalPage1 from './modalpage1';
import ModalPage2 from './modalpage2';
import { DeleteSession } from './actions';
import { SessionsBreaks } from '../types';

type ModalProps = {
    sessionData?: SessionsBreaks;
    onClose?: () => void;
};

export default function Modal({ sessionData, onClose }: ModalProps) {
    const [currentPage, setCurrentPage] = useState<'page1' | 'page2'>('page1');
    const [breaks, setBreaks] = useState(Number);
    const [breakTime, setBreakTime] = useState(Number);
    const [sessionId, setSessionId] = useState(Number);

    const handleNext = () => setCurrentPage('page2');
    const handleBack = () => setCurrentPage('page1');

    const sessionProp = sessionData?.session;
    const breaksProp = sessionData?.breaks;

    function CloseModal() {
        onClose?.();
        if (sessionId && !sessionData) {
            DeleteSession(sessionId);
            handleBack();
        }
    }

    useEffect(() => {
        setCurrentPage('page1');
        setBreaks(Number);
        setBreakTime(Number);
        setSessionId(Number);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="max-w-md w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                <h2 className="text-2xl text-sky-900 font-bold mb-6">
                    {sessionData ? 'Edit' : 'Create'} work session
                </h2>

                <div>
                    {currentPage == 'page1' && (
                        <ModalPage1
                            onNext={(
                                breaksFromPage1,
                                breakTimeFromPage1,
                                sessionId
                            ) => {
                                handleNext();
                                setBreaks(breaksFromPage1);
                                setBreakTime(breakTimeFromPage1);
                                setSessionId(sessionId);
                            }}
                            sessionData={sessionProp}
                        />
                    )}
                    {currentPage == 'page2' && (
                        <ModalPage2
                            onBack={handleBack}
                            breaks={breaks}
                            breakTime={breakTime}
                            sessionId={sessionId}
                            onClose={onClose}
                            breaksData={breaksProp}
                        />
                    )}
                </div>

                <button
                    className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80 cursor-pointer"
                    type="button"
                    onClick={CloseModal}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
