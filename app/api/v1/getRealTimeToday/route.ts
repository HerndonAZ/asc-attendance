import { getToday } from '@/lib/db';
import {
  apiUrl,
  credentials,
  handleTessituraError
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300;
export const revalidate = 0;
export const dynamic = 'force-dynamic'
const fetchDate = getToday();
export async function GET(req: NextRequest) {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }

    if (credentials && fetchDate) {

      const cache = 'no-cache';
      const customApiEndpoint = `/custom/Attendance_Update?perf_dt=${fetchDate}`;

      try {
        const response = await fetch(apiUrl + customApiEndpoint, {
          cache: cache,
          method: 'GET',
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });

        if (!response.ok) {
          await handleTessituraError(response);


        }

        const data = await response.json();

        console.log(fetchDate)

        return NextResponse.json(data);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error during API request' });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error during API request' });
  }

  return NextResponse.json({ error: 'Error during API request' });
} 
