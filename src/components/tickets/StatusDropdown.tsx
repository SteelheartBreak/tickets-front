'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TICKET_STATUSES } from '@/lib/constants';
import type { TicketStatus } from '@/types/tickets';

interface StatusDropdownProps {
  ticketId: string;
  currentStatus: TicketStatus;
}

export function StatusDropdown({ ticketId, currentStatus }: StatusDropdownProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (newStatus === currentStatus) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={TICKET_STATUSES[currentStatus].color}
          disabled={loading}
        >
          {loading ? 'Updating...' : TICKET_STATUSES[currentStatus].label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(TICKET_STATUSES).map(([key, { label }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleStatusChange(key as TicketStatus)}
            disabled={key === currentStatus}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}