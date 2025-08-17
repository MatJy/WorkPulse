'use client';

import { useState } from 'react';
import { CreateWorkLogEnded } from './actions';

type Prop = {
  logId: number;
};

export default function EndSessionButton({ logId }: Prop) {
  const [isLoading, setIsLoading] = useState(false);

  async function EndSession(id: number) {
    try {
      setIsLoading(true);
      await CreateWorkLogEnded(id);
    } catch (error) {
      console.error('Failed to end session:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={() => EndSession(logId)}
      className='inline-flex cursor-pointer items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110'
    >
      {isLoading ? (
        <>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='animate-spin h-5 w-5 mr-2 text-white'
          >
            <circle
              strokeWidth='4'
              stroke='currentColor'
              r='10'
              cy='12'
              cx='12'
              className='opacity-25'
            />
            <path
              d='M4 12a8 8 0 018-8v8H4z'
              fill='currentColor'
              className='opacity-75'
            />
          </svg>
          Loading...
        </>
      ) : (
        'End session'
      )}
    </button>
  );
}
