import { NextResponse } from 'next/server';
import { getLeads, createLead, updateLeadStatus } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const newLead = await createLead(body);
    return NextResponse.json({
      success: true,
      message: 'Your service request has been received. Our coordination desk will reach out promptly.',
      lead: newLead
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;
    if (!id) {
      return NextResponse.json({ error: 'Lead id required' }, { status: 400 });
    }
    const updated = await updateLeadStatus(id, status, adminNotes);
    return NextResponse.json({
      success: true,
      lead: updated
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

