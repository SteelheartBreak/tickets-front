import Link from 'next/link';
import { auth0 } from '../lib/auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to TechCorp Tickets
      </h1>
      
      {user ? (
        <div className="text-center">
          <p className="mb-4">Hello, {user.name}!</p>
          <div className="flex gap-4">
            <Link 
              href="/tickets"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Go to Tickets
            </Link>
            <a 
              href="/auth/logout"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <a 
          href="/auth/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </a>
      )}
    </div>
  );
}