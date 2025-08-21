import { apiUrl, credentials } from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';
import { redisGet } from 'providers/Redis/redis';

export const revalidate = 0;

const cacheKey = 'asc_last_7_days_cache'; // Use the same key as the cron job

/**
 * Fetch attendance update data for the last 7 days from Redis cache.
 * Data is updated daily by a cron job at midnight Arizona time.
 */
export async function GET(req: NextRequest) {
  const cachedResponse = await redisGet(cacheKey);
  const searchParams = req.nextUrl.searchParams;
  const forceRefresh = searchParams.get('refresh');

  if (req.method !== 'GET') {
    return NextResponse.json('error: Method Not Allowed', { status: 405 });
  }

  // Return cached data if available and not forcing refresh
  if (cachedResponse && !forceRefresh) {
    console.log('Returning cached last 7 days data');
    return NextResponse.json(JSON.parse(cachedResponse));
  }

  // If no cached data or forcing refresh, fallback to live fetch
  console.log('No cached data found, falling back to live fetch');

  if (credentials) {
    try {
      const today = new Date();
      const allData = [];

      // Fetch data for each of the last 7 days independently
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        console.log(`Live fetch: Getting data for ${dateStr}...`);

        try {
          const endpoint = `/custom/Attendance_Update_priceType?perf_dt=${dateStr}`;
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
            console.warn(
              `Live fetch: Failed to fetch data for ${dateStr}: ${response.status}`
            );
            continue; // Skip this date and continue with others
          }

          const dayData = await response.json();

          if (dayData && Array.isArray(dayData)) {
            allData.push(...dayData);
            console.log(
              `Live fetch: Got ${dayData.length} records for ${dateStr}`
            );
          }

          // Add a small delay between requests
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (dayError) {
          console.error(
            `Live fetch: Error fetching data for ${dateStr}:`,
            dayError
          );
          continue;
        }
      }

      if (allData.length > 0) {
        console.log(
          `Live fetch completed: Retrieved ${allData.length} total records for last 7 days`
        );
        return NextResponse.json(allData);
      } else {
        return NextResponse.json(
          { error: 'No data available for the last 7 days' },
          { status: 404 }
        );
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error during API request' });
    }
  }

  return NextResponse.json({ error: 'Error during API request' });
}
