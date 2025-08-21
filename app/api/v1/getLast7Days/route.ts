import {
  apiUrl,
  credentials,
  handleTessituraError
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';
import { redis, redisGet, redisSet } from 'providers/Redis/redis';

export const revalidate = 0;

const cacheKey = 'asc_perf_cache';

/**
 * Fetch attendance update data for the seven-day window surrounding a
 * reference date. By default the reference date is today, but it may be
 * overridden with the `start` query parameter (format: YYYY-MM-DD). The API
 * responds with performances from three days before through three days after
 * the reference date.
 */
export async function GET(req: NextRequest) {
  const cachedResponse = await redisGet(cacheKey);
  const searchParams = req.nextUrl.searchParams;
  const cron = searchParams.get('cron');
  const startParam = searchParams.get('start');

  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }

  if (cachedResponse && !cron && !startParam) {
    return NextResponse.json(JSON.parse(cachedResponse));
  } else if (cron) {
    await redis.del(cacheKey);
  }

  if (credentials) {
    const endpoint = '/custom/Attendance_Update_priceType';
    try {
      const response = await fetch(apiUrl + endpoint, {
        cache: 'no-cache',
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

      if (data && Array.isArray(data)) {
        try {
          // Determine the reference date.
          // - use ?start=YYYY-MM-DD if provided and valid
          // - otherwise fall back to the current date
          let referenceDate = new Date();
          if (startParam) {
            const parsed = new Date(startParam);
            if (!isNaN(parsed.getTime())) {
              referenceDate = parsed;
            }
          }

          // Compute the window three days before and after the reference date.
          const startDate = new Date(referenceDate);
          startDate.setDate(startDate.getDate() - 3);

          const endDate = new Date(referenceDate);
          endDate.setDate(endDate.getDate() + 3);

          // Filter the performances within the 7-day range
          const filteredData = data.filter((perf) => {
            const perfDate = new Date(perf.perf_dt);
            return perfDate >= startDate && perfDate <= endDate;
          });

          // Cache and return filtered data (only when not using a custom start)
          if (!startParam) {
            await redisSet(cacheKey, JSON.stringify(filteredData));
          }
          console.log(filteredData, 'DATA FILTERED');
          return NextResponse.json(filteredData);
        } catch (err) {
          return NextResponse.json(JSON.stringify(err));
        }
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error during API request' });
    }
  }

  return NextResponse.json({ error: 'Error during API request' });
}
