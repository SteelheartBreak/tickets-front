import { NextRequest, NextResponse } from 'next/server';
import { TicketService } from '@/services/ticketService';

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await req.json();

    const ticket = await TicketService.updateTicket(id, body);
    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}
