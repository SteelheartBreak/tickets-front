import { TicketService } from '@/services/ticketService';

export default async function TicketsPage() {
  const tickets = await TicketService.getTickets();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Tickets</h1>
      
      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{ticket.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {ticket.description}
                </p>
              </div>
              <span className={`px-3 py-1 rounded text-sm ${
                ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {ticket.status}
              </span>
            </div>
            
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {ticket.type}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {ticket.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}