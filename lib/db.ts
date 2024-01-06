import { convertXmlToJson } from './hooks/convertXML';
import {
  credentials,
  apiUrl,
  handleTessituraError
} from './providers/Tessitura';

export const fetchTess = async () => {
  if (credentials) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const today = `${year}-${month}-${day}`;
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=' + today;
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
    }
  }
};

// Call the fetchData function
