import { NextRequest, NextResponse } from 'next/server';
import { TicketService } from '@/services/ticketService';

// PATCH para actualizar ticket
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 👈 Aquí se espera la Promise
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
