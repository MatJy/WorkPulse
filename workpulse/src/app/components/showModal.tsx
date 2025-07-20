'use client';
import { useState } from 'react';
import Modal from './modal';

export default function ShowModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                Create work session
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
