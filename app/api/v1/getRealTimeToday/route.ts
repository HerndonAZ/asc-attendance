import { NextRequest, NextResponse } from 'next/server';
import {
    credentials,
    apiUrl,
    handleTessituraError
  } from 'lib/providers/Tessitura'
  import { redis, redisGet, redisSet } from 'lib/providers/Redis/redis';
import { getToday } from 'lib/db';
export const maxDuration = 35
export const revalidate = 0;
const cacheKey = "asc_perf_cache_all"

export async function GET(req:NextRequest) {
  const cachedResponse = await redisGet(cacheKey);


    if (req.method !== 'GET') {
      return NextResponse.json('error: Method Not Allowed', { status: 405 });
    }

    if (cachedResponse) {
      // If found in cache, return the cached response
      return NextResponse.json(JSON.parse(cachedResponse));
    } 

    if (credentials) {
    const fetchDate = getToday();
    const cache = 'no-cache'
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + fetchDate;
    try {
      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: cache,
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + credentials,
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        await handleTessituraError(response);
      }

        const data = await response.json();

     
        return NextResponse.json(data);
     
      } catch (error) {

        console.error(error);

      return NextResponse.json({ error: 'Error during API request' , });
    }}

     return NextResponse.json({ error: 'Error during API request' });
    }