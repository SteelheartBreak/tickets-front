import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface CSVTicket {
  external_id: string;
  title: string;
  description: string;
  type: 'bug' | 'feature' | 'support';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  created_at: string;
}

/**
 * Normaliza el tipo de ticket
 */
function normalizeType(type: string): 'bug' | 'feature' | 'support' {
  const normalized = type.toLowerCase().trim();
  const validTypes = ['bug', 'feature', 'support'];
  return validTypes.includes(normalized) ? normalized as any : 'support';
}

/**
 * Normaliza el estado de ticket
 */
function normalizeStatus(status: string): 'open' | 'in_progress' | 'resolved' | 'closed' {
  const normalized = status.toLowerCase().trim().replace(/[_-]/g, '_');
  const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
  return validStatuses.includes(normalized) ? normalized as any : 'open';
}

/**
 * Normaliza la prioridad
 */
function normalizePriority(priority: string): 'low' | 'medium' | 'high' | 'critical' {
  const normalized = priority.toLowerCase().trim();
  const validPriorities = ['low', 'medium', 'high', 'critical'];
  return validPriorities.includes(normalized) ? normalized as any : 'medium';
}

/**
 * Parsea CSV a objetos
 */
function parseCSV(csvContent: string): CSVTicket[] {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const tickets: CSVTicket[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV line respetando comillas
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim().replace(/^"|"$/g, ''));
    
    const ticket: any = {};
    headers.forEach((header, index) => {
      ticket[header] = values[index] || '';
    });
    
    tickets.push({
      external_id: ticket.external_id,
      title: ticket.title,
      description: ticket.description,
      type: normalizeType(ticket.type),
      status: normalizeStatus(ticket.status),
      priority: normalizePriority(ticket.priority),
      created_at: ticket.created_at,
    });
  }
  
  return tickets;
}

/**
 * Lógica compartida de ingesta
 */
async function runIngest(source: 'cron' | 'manual') {
  const startTime = Date.now();
  const logs: string[] = [];
  
  try {
    logs.push(`🚀 [INGEST-${source.toUpperCase()}] Iniciando proceso de ingesta...`);
    
    // Leer el CSV desde public/sample-tickets.csv
    const csvUrl = `${process.env.APP_BASE_URL || 'http://localhost:3000'}/sample-tickets.csv`;
    logs.push(`📥 [INGEST] Descargando CSV desde: ${csvUrl}`);
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    logs.push(`✅ [INGEST] CSV descargado correctamente (${csvContent.length} bytes)`);
    
    // Parsear CSV
    const tickets = parseCSV(csvContent);
    logs.push(`📊 [INGEST] Parseados ${tickets.length} tickets del CSV`);
    
    // Procesar cada ticket
    let inserted = 0;
    let updated = 0;
    let errors = 0;
    
    for (const ticket of tickets) {
      try {
        // Verificar si el ticket ya existe por external_id
        const { data: existing } = await supabase
          .from('tickets')
          .select('id, status')
          .eq('external_id', ticket.external_id)
          .single();
        
        const ticketData = {
          ...ticket,
          updated_at: new Date().toISOString(),
          // Si el status es resolved/closed, agregar resolved_at
          resolved_at: ['resolved', 'closed'].includes(ticket.status) 
            ? ticket.created_at 
            : null,
        };
        
        if (existing) {
          // Actualizar ticket existente
          const { error } = await supabase
            .from('tickets')
            .update(ticketData)
            .eq('external_id', ticket.external_id);
          
          if (error) throw error;
          
          updated++;
          logs.push(`🔄 [INGEST] Actualizado: ${ticket.external_id} - ${ticket.title}`);
        } else {
          // Insertar nuevo ticket
          const { error } = await supabase
            .from('tickets')
            .insert(ticketData);
          
          if (error) throw error;
          
          inserted++;
          logs.push(`✨ [INGEST] Insertado: ${ticket.external_id} - ${ticket.title}`);
        }
      } catch (err) {
        errors++;
        logs.push(`❌ [INGEST] Error con ${ticket.external_id}: ${err}`);
      }
    }
    
    const duration = Date.now() - startTime;
    
    logs.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logs.push(`✅ [INGEST] Proceso completado en ${duration}ms`);
    logs.push(`📊 [INGEST] Resultados:`);
    logs.push(`   - Insertados: ${inserted}`);
    logs.push(`   - Actualizados: ${updated}`);
    logs.push(`   - Errores: ${errors}`);
    logs.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Log en consola del servidor
    logs.forEach(log => console.log(log));
    
    return {
      success: true,
      message: 'Ingesta completada',
      stats: {
        inserted,
        updated,
        errors,
        total: tickets.length,
        duration: `${duration}ms`,
        source,
      },
      logs,
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logs.push(`❌ [INGEST] Error crítico: ${errorMessage}`);
    
    // Log en consola del servidor
    logs.forEach(log => console.log(log));
    
    throw { errorMessage, logs };
  }
}

/**
 * GET /api/ingest
 * Para ser llamado por Vercel Cron Jobs
 */
export async function GET(request: NextRequest) {
  try {
    const result = await runIngest('cron');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error durante la ingesta (cron)',
      error: error.errorMessage,
      logs: error.logs,
    }, { status: 500 });
  }
}

/**
 * POST /api/ingest
 * Para ser llamado manualmente o por scripts
 */
export async function POST(request: NextRequest) {
  try {
    const result = await runIngest('manual');
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error durante la ingesta (manual)',
      error: error.errorMessage,
      logs: error.logs,
    }, { status: 500 });
  }
}
