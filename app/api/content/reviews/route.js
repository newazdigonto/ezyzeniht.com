import { NextResponse } from 'next/server';
import { saveGoogleReview, deleteGoogleReview, getFullSiteData } from '@/lib/db';

export async function GET() {
  try {
    const data = await getFullSiteData();
    return NextResponse.json(data.googleReviews || []);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const review = body.review || body;
    if (!review) {
      return NextResponse.json({ error: 'Review data required' }, { status: 400 });
    }
    const updatedReviews = await saveGoogleReview(review);
    return NextResponse.json({
      success: true,
      message: 'Google review saved successfully',
      reviews: updatedReviews
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Review id required' }, { status: 400 });
    }
    const updatedReviews = await deleteGoogleReview(id);
    return NextResponse.json({
      success: true,
      message: 'Google review deleted',
      reviews: updatedReviews
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

