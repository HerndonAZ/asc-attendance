'use server'
import {
  credentials,
  apiUrl,
  handleTessituraError
} from './providers/Tessitura';



export const fetchToday = async () => {
  if (credentials) {
    const currentDate = new Date();
    // Create a new date object in the 'America/Phoenix' time zone
    const phoenixDate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/Phoenix' }));
    const year = phoenixDate.getFullYear();
    const month = phoenixDate.getMonth() + 1; // Months are zero-based, so add 1
    const day =  phoenixDate.getDate()
    const fetchDate = `${year}-${month}-${day}`;
    const cache = 'force-cache'
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + fetchDate;
    //const workingEndpoint = '/ReferenceData/PerformanceTypes/Summary'
    try {
      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: cache,
        next:{revalidate : 30},
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
 
export const fetchTess = async (setTimeStamp?: any | null, selectDate?: any) => {
  if (credentials) {
    const currentDate = new Date();
    // Create a new date object in the 'America/Phoenix' time zone
    const phoenixDate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/Phoenix' }));
    
    // Calculate the date for yesterday
    const yesterday = (phoenixDate.getDate() - 1);
    
    // Extract year, month, and day
    const year = phoenixDate.getFullYear();
    const month = phoenixDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = selectDate === ('today' || 'initial') ? phoenixDate.getDate() : yesterday;
    const fetchDate = `${year}-${month}-${day}`;
    const cache = selectDate === 'today' ? 'no-cache' : 'force-cache'
    

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
