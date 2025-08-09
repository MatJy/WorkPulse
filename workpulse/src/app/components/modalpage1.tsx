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
    const [optionValues, setOptionValues] = useState(['']);

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
        const total: number = Number(lengthHours) * 60 + Number(lengthMinutes);

        if (total <= 60 && total > 30) {
            setOptionValues(['10', '15']);
        } else if (total > 60 && total <= 90) {
            setOptionValues(['15', '30']);
        } else if (total > 90 && total <= 120) {
            setOptionValues(['30', '60']);
        } else if (total > 120 && total <= 300) {
            setOptionValues(['30', '60', '90', '120']);
        } else if (total > 120) {
            setOptionValues(['60', '90', '120']);
        } else if (total === 30) {
            setOptionValues(['10', '15']);
        }
        if (sessionData) {
            setLengthHours(Math.floor(sessionData.length / 60).toString());
            setLengthMinutes((sessionData.length % 60).toString());
            setBreakTime(sessionData.break_interval.toString());
        }
    }, [sessionData, lengthHours, lengthMinutes]);

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
                        type="number"
                        placeholder="Hours"
                        value={lengthHours}
                        max={10}
                        onChange={handleChange}
                    />
                    <input
                        className="mt-1 p-2 w-full border rounded-md"
                        name="minutes"
                        id="minutes"
                        type="number"
                        placeholder="Minutes"
                        value={lengthMinutes}
                        onChange={handleChange}
                        max={59}
                        min={totalLength < 60 ? 30 : 0}
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
                    value={breakTime}
                    onChange={(e) => setBreakTime(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                >
                    <option value="" hidden>
                        Select break interval
                    </option>
                    {optionValues.map((value) => (
                        <option key={value} value={value}>
                            {value} min
                        </option>
                    ))}
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
