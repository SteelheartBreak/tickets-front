import { supabase } from '@/lib/supabase';
import type { 
  Ticket, 
  CreateTicketInput, 
  UpdateTicketInput,
  TicketFilters 
} from '@/types/tickets';

export class TicketService {
  /**
   * Obtener todos los tickets con filtros opcionales
   */
  static async getTickets(filters?: TicketFilters): Promise<Ticket[]> {
    let query = supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });

    // Aplicar filtros si existen
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to fetch tickets');
    }

    return data || [];
  }

  /**
   * Obtener un ticket por ID
   */
  static async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }

    return data;
  }

  /**
   * Crear un nuevo ticket
   */
  static async createTicket(input: CreateTicketInput): Promise<Ticket> {
    const { data, error } = await supabase
      .from('tickets')
      .insert({
        ...input,
        status: input.status || 'open',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }

    return data;
  }

  /**
   * Actualizar un ticket
   */
  static async updateTicket(
    id: string, 
    input: UpdateTicketInput
  ): Promise<Ticket> {
    // Si el status cambia a 'resolved', agregar resolved_at
    const updateData = { ...input };
    if (input.status === 'resolved' && !input.resolved_at) {
      updateData.resolved_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating ticket:', error);
      throw new Error('Failed to update ticket');
    }

    return data;
  }

  /**
   * Cambiar solo el status de un ticket
   */
  static async updateTicketStatus(
    id: string, 
    status: Ticket['status']
  ): Promise<Ticket> {
    return this.updateTicket(id, { status });
  }

  /**
   * Eliminar un ticket
   */
  static async deleteTicket(id: string): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting ticket:', error);
      throw new Error('Failed to delete ticket');
    }
  }

  /**
   * Obtener estadísticas de tickets
   */
  static async getStats() {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, type, priority');

    if (error) {
      console.error('Error fetching stats:', error);
      return null;
    }

    return {
      total: data.length,
      byStatus: this.groupBy(data, 'status'),
      byType: this.groupBy(data, 'type'),
      byPriority: this.groupBy(data, 'priority'),
    };
  }

  private static groupBy(arr: any[], key: string) {
    return arr.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }
}