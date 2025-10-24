import Link from 'next/link';
import { auth0 } from '../lib/auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 text-center transition-colors duration-300">
      <h1 className="text-5xl font-semibold mb-4 tracking-tight text-neutral-900 dark:text-neutral-100">
        Welcome to <span className="font-bold">TechCorp Tickets</span>
      </h1>

      <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-10 leading-relaxed">
        A simple, elegant system to manage your team’s tickets efficiently.
      </p>

      {user ? (
        <div className="space-y-6">
          <p className="text-lg text-neutral-800 dark:text-neutral-200">
            Hello, <span className="font-medium">{user.name}</span> 👋
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/tickets"
              className="px-6 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 font-medium transition-all duration-200"
            >
              Go to Tickets
            </Link>

            <a
              href="/auth/logout"
              className="px-6 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 font-medium transition-all duration-200"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <a
          href="/auth/login"
          className="px-8 py-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 font-medium transition-all duration-200"
        >
          Login
        </a>
      )}

      <footer className="absolute bottom-6 text-xs text-neutral-400 dark:text-neutral-600">
        © {new Date().getFullYear()} TechCorp. All rights reserved.
      </footer>
    </div>
  );
}
