'use client';

import { useEffect, useState } from 'react';
import { CreateWorkSession, EditWorkSession } from './actions';
import { SessionsBreaks } from '../types';

type Props = {
    onNext: (breaks: number, breakTime: number, sessionId: number) => void;
    sessionData?: SessionsBreaks['session'];
};

export default function ModalPage1({ sessionData, onNext }: Props) {
    const [breakTime, setBreakTime] = useState('');
    const [lengthHours, setLengthHours] = useState('');
    const [lengthMinutes, setLengthMinutes] = useState('');

    const breaks: number = Math.max(
        0,
        Math.floor(
            (Number(lengthHours) * 60 + Number(lengthMinutes)) /
                Number(breakTime)
        ) - 1
    );

    const totalLength: number =
        Number(lengthHours) * 60 + Number(lengthMinutes);

    useEffect(() => {
        if (sessionData) {
            setLengthHours(Math.floor(sessionData.length / 60).toString());
            setLengthMinutes((sessionData.length % 60).toString());
            setBreakTime(sessionData.break_interval.toString());
        }
    }, [sessionData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Sallitaan vain numerot
        if (!/^\d*$/.test(value)) return;

        if (name === 'minutes') {
            setLengthMinutes(value);
        } else if (name === 'hours') {
            setLengthHours(value);
        }
    };

    async function handleSubmit(formData: FormData) {
        let sessionId;

        if (sessionData) {
            sessionId = await EditWorkSession(
                formData,
                totalLength,
                sessionData.id
            );
        } else {
            sessionId = await CreateWorkSession(formData, totalLength);
        }
        onNext(breaks, Number(breakTime), sessionId);
    }
    return (
        <form>
            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="name"
                >
                    Session name
                </label>
                <input
                    className="mt-1 p-2 w-full border rounded-md"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={sessionData?.name ?? ''}
                    required
                />
            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="hours"
                >
                    Length of the session
                </label>
                <div className="flex w-50">
                    {' '}
                    <input
                        className="mt-1 p-2 w-full border rounded-md"
                        name="hours"
                        id="hours"
                        type="text"
                        placeholder="Hours"
                        value={lengthHours}
                        max="10"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="mt-1 p-2 w-full border rounded-md"
                        name="minutes"
                        id="minutes"
                        type="text"
                        placeholder="Minutes"
                        value={lengthMinutes}
                        onChange={handleChange}
                        max="59"
                        min="30"
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="break"
                >
                    Break every:
                </label>
                <select
                    className="mt-1 p-2 w-full border rounded-md"
                    name="breakInterval"
                    id="breakInterval"
                    required
                    value={breakTime}
                    onChange={(e) => setBreakTime(e.target.value)}
                >
                    <option value="" hidden>
                        Select your option
                    </option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1 hour 30 minutes</option>
                    <option value="120">2 hours</option>
                </select>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80 cursor-pointer"
                    type="submit"
                    formAction={handleSubmit}
                >
                    Next
                </button>
            </div>
        </form>
    );
}
