import { getYesterday } from '@/lib/hooks/dateHelpers';
import { redis, redisGet, redisSet } from '@/lib/providers/Redis/redis';
import {
  apiUrl,
  credentials,
  handleTessituraError
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 300;
export const revalidate = 0;
const cacheKey = 'asc_perf_cache_previous_day';

export async function GET(req: NextRequest) {
  try {
    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }

    const cachedResponse = await redisGet(cacheKey);
    const searchParams = req.nextUrl.searchParams;
    const cron = searchParams.get('cron');

    if (cron) {
      await redis.del(cacheKey);
    } else if (cachedResponse && !cron) {
      return NextResponse.json(JSON.parse(cachedResponse));
    }

    if (credentials) {
      const fetchDate = getYesterday();
      const cache = !cron ? 'force-cache' : 'no-cache';
      const customApiEndpoint = `/custom/Attendance_Update_priceType?perf_dt=${fetchDate}`;

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

      if (data) {
        try {
          await redisSet(cacheKey, JSON.stringify(data));
          return NextResponse.json(data);
        } catch (err) {
          return NextResponse.json(JSON.stringify(err));
        }
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Error during API request',
      message: error
    });
  }

  return NextResponse.json({ error: 'Error during API request' });
}
