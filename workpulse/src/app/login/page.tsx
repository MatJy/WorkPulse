'use client';
import { useTransition } from 'react';
import { login } from './actions';
import Link from 'next/link';

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const isLoading = isPending;

  return (
    <main className='min-h-screen bg-gradient-to-br from-sky-100 to-blue-200'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Login</h2>
          <form
            className='flex flex-col'
            action={(formData: FormData) =>
              startTransition(() => login(formData))
            }
          >
            <input
              type='email'
              className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
              placeholder='Email address'
              name='email'
              id='email'
              required
            />
            <input
              type='password'
              className='bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150'
              placeholder='Password'
              name='password'
              id='password'
              required
            />

            <button
              type='submit'
              disabled={isLoading}
              className='cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 flex items-center justify-center'
            >
              {isLoading ? (
                <>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
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
                'Login'
              )}
            </button>
          </form>

          <div className='pt-4 text-center'>
            <Link href='/' className='text-sm text-sky-600 hover:underline'>
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
