'use client';

import { useState, useEffect } from 'react';
import { TicketCard } from '@/components/tickets/TicketCard';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { CreateTicketDialog } from '@/components/tickets/CreateTicketDialog';
import { TicketService } from '@/services/ticketService';
import type { Ticket, TicketFilters as Filters } from '@/types/tickets';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await TicketService.getTickets(filters);
      setTickets(data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tickets</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading...' : `${tickets.length} tickets found`}
          </p>
        </div>
        <CreateTicketDialog />
      </div>

      <div className="mb-6">
        <TicketFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading tickets...</div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
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