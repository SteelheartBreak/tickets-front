// test-env.js
require('dotenv').config({ path: '.env.local' });

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🧪 TEST DE VARIABLES DE ENTORNO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('AUTH0_DOMAIN:', process.env.AUTH0_DOMAIN);
console.log('AUTH0_CLIENT_ID:', process.env.AUTH0_CLIENT_ID);
console.log('AUTH0_SECRET:', process.env.AUTH0_SECRET ? '✅ Existe (oculto)' : '❌ NO EXISTE');
console.log('APP_BASE_URL:', process.env.APP_BASE_URL);
console.log('AUTH0_CLIENT_SECRET:', process.env.AUTH0_CLIENT_SECRET ? '✅ Existe (oculto)' : '❌ NO EXISTE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');