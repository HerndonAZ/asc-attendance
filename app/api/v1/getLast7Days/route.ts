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
          // Get the reference date (assume first item in list)
          const referenceDate = new Date(data[0].perf_dt);

          // Define start and end range
          const startDate = new Date(referenceDate);
          startDate.setDate(startDate.getDate() - 3);

          const endDate = new Date(referenceDate);
          endDate.setDate(endDate.getDate() + 3);

          // Filter the performances within the 7-day range
          const filteredData = data.filter((perf) => {
            const perfDate = new Date(perf.perf_dt);
            return perfDate >= startDate && perfDate <= endDate;
          });

          // Cache and return filtered data
          await redisSet(cacheKey, JSON.stringify(filteredData));
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
