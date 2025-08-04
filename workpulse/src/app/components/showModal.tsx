'use client';
// import { useState } from 'react';
// import Modal from './modal';

// export default function ShowModal() {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <>
//             <button
//                 type="button"
//                 className="cursor-pointer"
//                 onClick={() => setIsOpen(true)}
//             >
//                 Create work session
//             </button>

//             <Modal onClose={() => setIsOpen(false)} />
//         </>
//     );
// }

import { createPortal } from 'react-dom';
import Modal from './modal';
import { useState } from 'react';

export default function PortalModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="group relative flex items-center justify-center cursor-pointer text-white text-4xl w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-blue-600 to-cyan-400 shadow-lg hover:scale-105 transition-transform duration-200"
                aria-label="Open new work session"
            >
                +
                <span className="absolute bottom-[-2rem] opacity-0 group-hover:opacity-100 text-sm bg-gray-800 text-white py-1 rounded shadow transition-opacity duration-200">
                    New work session
                </span>
            </button>

            {showModal &&
                createPortal(
                    <Modal onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}
