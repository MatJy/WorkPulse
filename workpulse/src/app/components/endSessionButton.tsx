'use client';

import { CreateWorkLogEnded } from './actions';

type Prop = {
    logId: number;
};

export default function EndSessionButton({ logId }: Prop) {
    return (
        <button
            onClick={async () => await CreateWorkLogEnded(logId)}
            className="inline-flex cursor-pointer items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
        >
            End session
        </button>
    );
}
