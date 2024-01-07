'use server'
import { convertXmlToJson } from './hooks/convertXML';
import {
  credentials,
  apiUrl,
  handleTessituraError
} from './providers/Tessitura';
const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Return the date for yesterday in a desired format
  return yesterday.toISOString().split('T')[0];
};

 
export const fetchTess = async (setTimeStamp?: any | null, selectDate?: any) => {
  if (credentials) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = selectDate === "today" ? String(date.getDate()).padStart(2, '0') : String(date.getDate() - 1).padStart(2, '0') ;

    const fetchDate = `${year}-${month}-${day}`;
    const yesterday = `${year}-${month}-${day}`;
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + fetchDate;
    //const workingEndpoint = '/ReferenceData/PerformanceTypes/Summary'
    try {
      const response = await fetch(apiUrl + customApiEndpoint, {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + credentials,
          'Content-Type': 'application/xml'
        }
      });
      if (!response.ok) {
        await handleTessituraError(response);
      }

      const xml = await response.text();
      const data = await convertXmlToJson(xml);
     
      return data;
    } catch (error) {
      // Handle other errors (e.g., network issues, deserialization errors)
      console.error(error);
    // } finally {
    //  setTimeStamp(Date.now())

    // }}
  } }
};

// Call the fetchData function
