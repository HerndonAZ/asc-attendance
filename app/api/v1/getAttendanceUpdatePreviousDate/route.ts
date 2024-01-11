import { NextRequest, NextResponse } from 'next/server';
import { credentials, apiUrl, handleTessituraError } from 'lib/providers/Tessitura';
import { getYesterday } from 'lib/db';
import { redis, redisGet, redisSet } from '@/lib/providers/Redis/redis';

export const maxDuration = 35;
export const revalidate = 0;
const cacheKey = 'asc_perf_cache_previous_day';

export async function GET(req: NextRequest) {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }

    const cachedResponse = await redisGet(cacheKey);
    const searchParams = req.nextUrl.searchParams;
    const noRefresh = searchParams.get('noRefresh');

    if (!noRefresh) {
      await redis.del(cacheKey);
    } else if (cachedResponse && !noRefresh) {
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    if (credentials) {
      const fetchDate = getYesterday();
      const cache = noRefresh ? 'force-cache' : 'no-cache';
      const customApiEndpoint = `/custom/Attendance_Update?perf_dt=${fetchDate}`;

      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: cache,
        method: 'GET',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        await handleTessituraError(response);
      }

      const data = await response.json();

      if (data) {
        try {
          await redisSet(cacheKey, JSON.stringify(data));
          return NextResponse.json(data)
        } catch (err) {
          return NextResponse.json(JSON.stringify(err));
        }
      }

    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error during API request', message: error });
  }

  return NextResponse.json({ error: 'Error during API request' });
}
