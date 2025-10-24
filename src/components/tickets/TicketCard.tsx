import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusDropdown } from './StatusDropdown';
import { TICKET_TYPES, TICKET_PRIORITIES } from '@/lib/constants';
import type { Ticket } from '@/types/tickets';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <Card className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
            {ticket.title}
          </CardTitle>
          <StatusDropdown ticketId={ticket.id} currentStatus={ticket.status} />
        </div>
      </CardHeader>

      <CardContent>
        {ticket.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
            {ticket.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge
            className={`${TICKET_TYPES[ticket.type].color} rounded-md text-xs px-2 py-1`}
          >
            {TICKET_TYPES[ticket.type].label}
          </Badge>
          <Badge
            className={`${TICKET_PRIORITIES[ticket.priority].color} rounded-md text-xs px-2 py-1`}
          >
            {TICKET_PRIORITIES[ticket.priority].label}
          </Badge>
          <Badge variant="outline" className="text-xs text-neutral-500 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700">
            {new Date(ticket.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
