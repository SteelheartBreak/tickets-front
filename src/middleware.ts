export const runtime = 'nodejs';

import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔥 MIDDLEWARE EJECUTÁNDOSE');
  console.log('📍 Path:', request.nextUrl.pathname);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    console.log('⏳ Llamando a auth0.middleware...');
    const response = await auth0.middleware(request);
    console.log('✅ auth0.middleware respondió:', response.status);
    return response;
  } catch (error) {
    console.error('❌ ERROR en auth0.middleware:');
    console.error(error);
    return new Response('Internal Server Error (middleware)', { status: 500 });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
