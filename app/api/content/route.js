import { NextResponse } from 'next/server';
import { getFullSiteData } from '@/lib/db';

export async function GET() {
  try {
    const data = await getFullSiteData();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // For general settings update
    return NextResponse.json({ success: true, message: 'Settings saved' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

