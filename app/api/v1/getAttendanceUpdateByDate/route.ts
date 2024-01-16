import { getToday } from '@/lib/db';
import {
  apiUrl,
  credentials,
  handleTessituraError
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }

  if (credentials) {
    const fetchDate = getToday();
    const cache = 'no-cache';
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + fetchDate;
    try {
      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: cache,
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + credentials,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      if (!response.ok) {
        await handleTessituraError(response);
      }

      const data = await response.json();

      return NextResponse.json(JSON.stringify(data));
    } catch (error) {
      console.error(error);

      return NextResponse.json({
        error: 'Error during API request',
        message: error
      });
    }
  }

  return NextResponse.json({ error: 'Error during API request' });
}
