#!/usr/bin/env node

/**
 * Script para ejecutar la ingesta de tickets manualmente
 * Uso: npm run ingest
 */

const baseUrl = process.env.APP_BASE_URL || 'http://localhost:3000';

console.log('🚀 Iniciando ingesta manual de tickets...');
console.log(`📍 URL: ${baseUrl}/api/ingest`);
console.log('');

fetch(`${baseUrl}/api/ingest`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(async (response) => {
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Ingesta completada exitosamente!');
      console.log('');
      console.log('📊 Estadísticas:');
      console.log(`   - Total procesados: ${data.stats.total}`);
      console.log(`   - Insertados: ${data.stats.inserted}`);
      console.log(`   - Actualizados: ${data.stats.updated}`);
      console.log(`   - Errores: ${data.stats.errors}`);
      console.log(`   - Duración: ${data.stats.duration}`);
      console.log('');
      
      if (data.logs && data.logs.length > 0) {
        console.log('📝 Logs detallados:');
        data.logs.forEach(log => console.log(log));
      }
    } else {
      console.error('❌ Error durante la ingesta:');
      console.error(data.error || data.message);
      
      if (data.logs && data.logs.length > 0) {
        console.log('');
        console.log('📝 Logs de error:');
        data.logs.forEach(log => console.log(log));
      }
      
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('❌ Error al ejecutar la ingesta:');
    console.error(error.message);
    console.error('');
    console.error('💡 Asegúrate de que:');
    console.error('   1. El servidor está corriendo (npm run dev)');
    console.error('   2. Las variables de entorno están configuradas');
    console.error('   3. La base de datos está accesible');
    process.exit(1);
  });
