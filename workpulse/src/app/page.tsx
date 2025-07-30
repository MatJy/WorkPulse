'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center space-y-6">
                <h1 className="text-4xl font-bold text-sky-800">WorkPulse</h1>
                <p className="text-gray-700 text-lg">
                    WorkPulse is a time management app that lets you create
                    focused work sessions and customize your break intervals the
                    way that suits you best. The app reminds you to take breaks
                    at the right time, helping you stay productive and maintain
                    your well-being.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <Link
                        href="/signup"
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition"
                    >
                        Sign Up
                    </Link>

                    <Link
                        href="/login"
                        className="border border-sky-500 text-sky-700 hover:bg-sky-100 font-semibold py-2 px-6 rounded-lg shadow hover:scale-105 transition"
                    >
                        Log In
                    </Link>
                </div>

                <div className="pt-4">
                    <h2 className="text-lg font-semibold text-sky-800 mb-2">
                        Why use WorkPulse?
                    </h2>
                    <ul className="text-left list-disc list-inside text-gray-600 space-y-1">
                        <li>Easily create work sessions</li>
                        <li>Set your own break intervals and durations</li>
                        <li>Get notified when it’s time for a break</li>
                        <li>
                            See how much time you&apos;ve spent on a session.
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
