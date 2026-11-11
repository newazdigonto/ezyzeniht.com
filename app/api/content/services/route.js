import { NextResponse } from 'next/server';
import { saveServices } from '@/lib/db';

export async function POST(req) {
  try {
    const { services } = await req.json();
    if (!Array.isArray(services)) {
      return NextResponse.json({ error: 'Services must be an array' }, { status: 400 });
    }
    await saveServices(services);
    return NextResponse.json({ success: true, message: 'Services and photos updated successfully', services });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

