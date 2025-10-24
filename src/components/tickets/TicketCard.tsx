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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg">{ticket.title}</CardTitle>
          <StatusDropdown ticketId={ticket.id} currentStatus={ticket.status} />
        </div>
      </CardHeader>
      <CardContent>
        {ticket.description && (
          <p className="text-sm text-gray-600 mb-4">{ticket.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <Badge className={TICKET_TYPES[ticket.type].color}>
            {TICKET_TYPES[ticket.type].label}
          </Badge>
          <Badge className={TICKET_PRIORITIES[ticket.priority].color}>
            {TICKET_PRIORITIES[ticket.priority].label}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {new Date(ticket.created_at).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}