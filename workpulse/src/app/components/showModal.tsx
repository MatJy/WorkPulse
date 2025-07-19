'use client';
import { useState } from 'react';
import Modal from './modal';

export default function ShowModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)}>
                Open Modal
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
