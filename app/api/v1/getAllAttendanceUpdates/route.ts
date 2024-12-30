import {
  apiUrl,
  credentials,
  handleTessituraError
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';
import { redis, redisGet, redisSet } from 'providers/Redis/redis';

export const revalidate = 0;

const cacheKey = 'asc_perf_cache';

export async function GET(req: NextRequest) {
  const cachedResponse = await redisGet(cacheKey);
  const searchParams = req.nextUrl.searchParams;
  const cron = searchParams.get('cron');
  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }

  if (cachedResponse && !cron) {
    // If found in cache, return the cached response
    return NextResponse.json(JSON.parse(cachedResponse));
  } else if (cron) {
    // If not found in cache, return a response indicating it's not in cache
    await redis.del(cacheKey);
  }
  if (credentials) {
    // const cache = 'no-cache';
    const endpoint = '/custom/Attendance_Update_priceType';
    try {
      const response = await fetch(apiUrl + endpoint, {
        // cache: cache,
        next: { revalidate: 3600 },
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
      // await new Promise((resolve) => setTimeout(resolve, 500));

      if (data) {
        try {
          await redisSet(cacheKey, JSON.stringify(data));
          return NextResponse.json(data);
        } catch (err) {
          return NextResponse.json(JSON.stringify(err));
        }
      }
    } catch (error) {
      // Handle other errors (e.g., network issues, deserialization errors)
      console.error(error);

      return NextResponse.json({ error: 'Error during API request' });
    }
  }

  return NextResponse.json({ error: 'Error during API request' });
}
