import Link from 'next/link';
import { signup } from './actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign up',
};

export default function SignUp() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6">
                <h2 className="text-2xl font-bold leading-tight text-center text-sky-800">
                    Sign up to create an account
                </h2>
                <p className="text-center text-base text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>

                <form className="space-y-4" action={signup}>
                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            maxLength={100}
                            placeholder="Your name"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 transition"
                    >
                        Sign up
                    </button>
                </form>
                <div className="pt-4 text-center">
                    <Link
                        href="/"
                        className="text-sm text-sky-600 hover:underline"
                    >
                        ← Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
