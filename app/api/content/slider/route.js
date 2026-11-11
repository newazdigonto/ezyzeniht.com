import { NextResponse } from 'next/server';
import { saveHeroSlides } from '@/lib/db';

export async function POST(req) {
  try {
    const { slides } = await req.json();
    if (!Array.isArray(slides)) {
      return NextResponse.json({ error: 'Slides must be an array' }, { status: 400 });
    }
    await saveHeroSlides(slides);
    return NextResponse.json({ success: true, message: 'Slider photos and copy updated successfully', slides });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

