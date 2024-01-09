'use server'
import {
  credentials,
  apiUrl,
  handleTessituraError
} from './providers/Tessitura';
const timeZone = 'America/Phoenix'
const currentDate = new Date();
const phoenixDate = new Date(currentDate.toLocaleString('en-US', { timeZone }));
const year = phoenixDate.getFullYear();
const month = phoenixDate.getMonth() + 1; 

const getToday = () => {
  const day =  phoenixDate.getDate()
  return `${year}-${month}-${day}` as const;

}

const getYesterday = () => {
  const day = (phoenixDate.getDate() - 1);
  return `${year}-${month}-${day}` as const;

}

export const fetchToday = async () => {
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
      console.log()
      return {data, time: new Date()};
    } catch (error) {
      console.error(error);
  }}
};
 
export const fetchTess = async (setTimeStamp?: any | null, selectDate?: any) => {
  if (credentials) {
    const yesterday = (phoenixDate.getDate() - 1);
    const month = phoenixDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = selectDate === ('today' || 'initial') ? phoenixDate.getDate() : yesterday;
    const fetchDate = `${year}-${month}-${day}`;
    const cache = 'no-cache' 
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + fetchDate;
    //const workingEndpoint = '/ReferenceData/PerformanceTypes/Summary'
    try {
      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: cache,
       // next:{revalidate : 30},
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
      return {data, time: new Date()};
    } catch (error) {
      // Handle other errors (e.g., network issues, deserialization errors)
      console.error(error);
    // } finally {
    //  setTimeStamp(Date.now())

    // }}
  }}
};

// Call the fetchData function
