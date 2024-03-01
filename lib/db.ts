'use server';
import { credentials, handleTessituraError } from './providers/Tessitura';
const timeZone = 'America/Phoenix';
const currentDate = new Date();
const phoenixDate = new Date(currentDate.toLocaleString('en-US', { timeZone }));
const year = phoenixDate.getFullYear();
const month = phoenixDate.getMonth() + 1;
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://rta.azscience.org';
export const getToday = () => {
  const day = phoenixDate.getDate();
  return `${year}-${month}-${day}` as const;
};

export const getYesterday = () => {
  const day = phoenixDate.getDate() - 1;
  return `${year}-${month}-${day}` as const;
};

export const fetchToday = async () => {
  if (credentials) {
    try {
      const response = await fetch(baseUrl + '/api/v1/getRealTimeToday', {
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
      //ß      console.log()
      return { data, time: new Date() };
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchYesterday = async () => {
  if (credentials) {
    try {
      const response = await fetch(
        baseUrl + '/api/v1/getAttendanceUpdatePreviousDate',
        {
          next: { revalidate: 3600 * 6 },
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + credentials,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      );
      if (!response.ok) {
        await handleTessituraError(response);
      }

      const data = await response.json();
      //ß      console.log()
      return { data: data || [], time: new Date() };
    } catch (error) {
      console.error(error);
    }
  }
};
