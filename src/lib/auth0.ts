export const runtime = 'nodejs';

import { Auth0Client } from "@auth0/nextjs-auth0/server";

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔧 Inicializando Auth0 Client');
console.log('🔑 AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
console.log('🔑 AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
console.log('🔑 AUTH0_SECRET:', process.env.AUTH0_SECRET ? '✅ Existe' : '❌ NO EXISTE');
console.log('🔑 APP_BASE_URL:', process.env.APP_BASE_URL);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: 'openid profile email',
  }
});

console.log('✅ Auth0 Client creado exitosamente');
