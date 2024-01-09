import { NextRequest, NextResponse } from 'next/server';
import {
    credentials,
    apiUrl,
    handleTessituraError
  } from '../../../../lib/providers/Tessitura'
export async function GET(req:NextRequest) {

    if (req.headers.get('Authorization') !== `Bearer ${process.env.INTERNAL_API_KEY}`) {

        return NextResponse.json({ok: true, status: 401, error: 'Unauthorized'})
      }

  return NextResponse.json({ ok: true });
}