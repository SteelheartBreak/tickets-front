import { NextResponse } from 'next/server';
import { TicketService } from '@/services/ticketService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ticket = await TicketService.createTicket(body);
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}