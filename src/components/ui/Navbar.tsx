'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              TechCorp Tickets
            </Link>
            {user && (
              <Link href="/tickets" className="text-sm hover:underline">
                Tickets
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : user ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="/auth/logout">Logout</a>
                </Button>
              </>
            ) : (
              <Button size="sm" asChild>
                <a href="/auth/login">Login</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}