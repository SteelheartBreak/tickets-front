export const TICKET_TYPES = {
  bug: { label: 'Bug', color: 'bg-red-100 text-red-800' },
  feature: { label: 'Feature', color: 'bg-blue-100 text-blue-800' },
  support: { label: 'Support', color: 'bg-purple-100 text-purple-800' },
} as const;

export const TICKET_STATUSES = {
  open: { label: 'Open', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800' },
} as const;

export const TICKET_PRIORITIES = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  critical: { label: 'Critical', color: 'bg-red-100 text-red-800' },
} as const;