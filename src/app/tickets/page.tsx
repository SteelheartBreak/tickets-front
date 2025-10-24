import { auth0 } from '../../lib/auth0';
import { redirect } from 'next/navigation';
import { TicketService } from '@/services/ticketService';

export default async function TicketsPage() {
  // 🔒 Proteger la ruta
  const session = await auth0.getSession();
  
  if (!session) {
    redirect('/auth/login');
  }

  const user = session.user;
  const tickets = await TicketService.getTickets();

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tickets</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user.name}
          </span>
          <a 
            href="/auth/logout"
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </a>
        </div>
      </div>
      
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