'use client';

import { useState, useEffect, useCallback } from 'react';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { CreateTicketDialog } from '@/components/tickets/CreateTicketDialog';
import { TicketService } from '@/services/ticketService';
import type { Ticket, TicketFilters as Filters } from '@/types/tickets';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TicketService.getTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Tickets</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-1">
            {loading ? 'Loading...' : `${tickets.length} tickets found`}
          </p>
        </div>
        <CreateTicketDialog />
      </div>

      <div className="mb-6">
        <TicketFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
          No tickets found. Create your first ticket!
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
