'use server';
import { credentials, handleTessituraError } from './providers/Tessitura';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://rta.azscience.org';

type TessituraResult<T = unknown> = {
  data: T;
  time: Date;
};

export const requestTessitura = async <T = unknown>(
  endpoint: string,
  cache: RequestCache = 'no-cache'
): Promise<TessituraResult<T> | undefined> => {
  if (!credentials) return;
  try {
    const response = await fetch(baseUrl + endpoint, {
      method: 'GET',
      cache,
      headers: {
        Authorization: 'Basic ' + credentials,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      await handleTessituraError(response);
    }
    const data: T = await response.json();
    return { data, time: new Date() };
  } catch (error) {
    console.error(error);
  }
};

export const fetchLast7Days = async () => requestTessitura('/api/v1/getLast7Days');

export const fetchToday = async () => requestTessitura('/api/v1/getRealTimeToday');

export const fetchYesterday = async () => {
  const result = await requestTessitura<unknown[]>(
    '/api/v1/getAttendanceUpdatePreviousDate',
    'force-cache'
  );
  if (result) {
    return { data: result.data || [], time: result.time };
  }
};
