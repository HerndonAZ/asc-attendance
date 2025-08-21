import {
    apiUrl,
    credentials
} from 'lib/providers/Tessitura';
import { NextRequest, NextResponse } from 'next/server';
import { redis, redisSet } from 'providers/Redis/redis';

export const revalidate = 0;

const cacheKey = 'asc_last_7_days_cache';

/**
 * Cron job to fetch and cache the last 7 days of attendance data
 * This should run daily at midnight Arizona time
 */
export async function GET(req: NextRequest) {
  // Temporarily disabled for testing - uncomment for production
  // const authHeader = req.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  if (!credentials) {
    return NextResponse.json({ error: 'Missing Tessitura credentials' }, { status: 500 });
  }

  try {
    console.log('Starting Last 7 Days cron job...');
    
    // Calculate last 7 days from today (Arizona time)
    const today = new Date();
    const allData = [];
    
    // Fetch data for each of the last 7 days independently
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      console.log(`Fetching data for ${dateStr}...`);
      
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
          console.warn(`Failed to fetch data for ${dateStr}: ${response.status}`);
          continue; // Skip this date and continue with others
        }

        const dayData = await response.json();
        
        if (dayData && Array.isArray(dayData)) {
          allData.push(...dayData);
          console.log(`Successfully fetched ${dayData.length} records for ${dateStr}`);
        } else {
          console.log(`No data returned for ${dateStr}`);
        }
        
        // Add a small delay between requests to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (dayError) {
        console.error(`Error fetching data for ${dateStr}:`, dayError);
        // Continue with other dates even if one fails
        continue;
      }
    }

    if (allData.length > 0) {
      // Cache the combined data with a longer TTL (24 hours + buffer)
      await redisSet(cacheKey, JSON.stringify(allData));
      // Set expiration separately if your Redis setup supports it
      await redis.expire(cacheKey, 90000); // 25 hours TTL

      console.log(`Cron job completed: Cached ${allData.length} total records for last 7 days`);
      
      return NextResponse.json({
        success: true,
        totalRecords: allData.length,
        dateRange: {
          start: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        },
        daysProcessed: 7
      });
    } else {
      console.warn('No data was successfully fetched for any of the last 7 days');
      return NextResponse.json({ 
        error: 'No data fetched', 
        message: 'Failed to fetch data for all 7 days'
      }, { status: 500 });
    }

    return NextResponse.json({ error: 'No data received from Tessitura' }, { status: 500 });
  } catch (error) {
    console.error('Last 7 Days cron job error:', error);
    return NextResponse.json({ 
      error: 'Cron job failed', 
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
