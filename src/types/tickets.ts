export type TicketType = 'bug' | 'feature' | 'support';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Ticket {
  id: string;
  title: string;
  description?: string | null;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
}

export interface CreateTicketInput {
  title: string;
  description?: string;
  type: TicketType;
  status?: TicketStatus;
  priority: TicketPriority;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  type?: TicketType;
  status?: TicketStatus;
  priority?: TicketPriority;
  resolved_at?: string | null;
}

export interface TicketFilters {
  type?: TicketType;
  status?: TicketStatus;
  priority?: TicketPriority;
}