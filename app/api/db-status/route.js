import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const status = await testConnection();
    return NextResponse.json(status);
  } catch (err) {
    return NextResponse.json({
      connected: false,
      engine: 'Error',
      error: err.message
    }, { status: 500 });
  }
}

