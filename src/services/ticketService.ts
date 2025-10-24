import type { Ticket, TicketFilters, CreateTicketInput, TicketStatus } from '@/types/tickets';

/**
 * Servicio centralizado para manejar las operaciones de tickets
 * (fetch, create, update, delete) contra la API.
 * 
 * Todas las funciones son tipadas correctamente y con manejo básico de errores.
 */

export const TicketService = {
  /**
   * Obtener lista de tickets con filtros opcionales
   */
  async getTickets(filters: TicketFilters): Promise<Ticket[]> {
    try {
      const params = new URLSearchParams();

      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);

      const res = await fetch(`/api/tickets?${params.toString()}`);
      if (!res.ok) throw new Error(`Error fetching tickets: ${res.statusText}`);

      const data: Ticket[] = await res.json();
      return data;
    } catch (error) {
      console.error('TicketService.getTickets error:', error);
      return [];
    }
  },

  /**
   * Crear un nuevo ticket
   */
  async createTicket(input: CreateTicketInput): Promise<Ticket | null> {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error(`Error creating ticket: ${res.statusText}`);

      const data: Ticket = await res.json();
      return data;
    } catch (error) {
      console.error('TicketService.createTicket error:', error);
      return null;
    }
  },

  /**
   * Actualizar el estado de un ticket
   */
  async updateTicketStatus(ticketId: string, status: TicketStatus): Promise<boolean> {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error(`Error updating ticket: ${res.statusText}`);
      return true;
    } catch (error) {
      console.error('TicketService.updateTicketStatus error:', error);
      return false;
    }
  },

  /**
   * Eliminar un ticket por ID
   */
  async deleteTicket(ticketId: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error(`Error deleting ticket: ${res.statusText}`);
      return true;
    } catch (error) {
      console.error('TicketService.deleteTicket error:', error);
      return false;
    }
  },
};
