'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TICKET_TYPES, TICKET_STATUSES, TICKET_PRIORITIES } from '@/lib/constants';
import type { TicketFilters as Filters, TicketType, TicketStatus, TicketPriority } from '@/types/tickets';

interface TicketFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function TicketFilters({ filters, onFilterChange }: TicketFiltersProps) {
  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="flex flex-wrap gap-6 items-center bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="flex-1 min-w-[200px]">
        <Select
          value={filters.type || 'all'}
          onValueChange={(value: string) =>
            onFilterChange({ ...filters, type: value === 'all' ? undefined : (value as TicketType) })
          }
        >
          <SelectTrigger className="rounded-lg border-neutral-300 dark:border-neutral-700">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(TICKET_TYPES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Select
          value={filters.status || 'all'}
          onValueChange={(value: string) =>
            onFilterChange({ ...filters, status: value === 'all' ? undefined : (value as TicketStatus) })
          }
        >
          <SelectTrigger className="rounded-lg border-neutral-300 dark:border-neutral-700">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(TICKET_STATUSES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Select
          value={filters.priority || 'all'}
          onValueChange={(value: string) =>
            onFilterChange({ ...filters, priority: value === 'all' ? undefined : (value as TicketPriority) })
          }
        >
          <SelectTrigger className="rounded-lg border-neutral-300 dark:border-neutral-700">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {Object.entries(TICKET_PRIORITIES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(filters.type || filters.status || filters.priority) && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="rounded-lg border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
