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
            <button onClick={() => setShowModal(true)}>
                Show modal using a portal
            </button>
            {showModal &&
                createPortal(
                    <Modal onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}
