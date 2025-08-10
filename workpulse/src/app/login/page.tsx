import Link from 'next/link';
import { login } from './actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
};

export default function Login() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Login
                    </h2>
                    <form className="flex flex-col">
                        <input
                            type="email"
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Email address"
                            name="email"
                            id="email"
                        />
                        <input
                            type="password"
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Password"
                            name="password"
                            id="password"
                        />
                        <div className="flex items-center justify-between flex-wrap">
                            <a
                                href="#"
                                className="text-sm text-blue-500 hover:underline mb-0.5"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <p className="text-gray-900 mt-4">
                            Dont have an account?{' '}
                            <a
                                href="/signup"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                            formAction={login}
                        >
                            Login
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
            </div>
        </main>
    );
}
