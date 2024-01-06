import { convertXmlToJson } from "./hooks/convertXML";

const tessitura = {
	id: "1bf452bd-afb4-4b4f-888c-ce19505c06ee",
	name: "Arizona Science Center LIVE",
	values: [
		{
			key: "rest_api_url",
			value: "https://AZSCICUSAZ0restprod.tnhs.cloud/TessituraService/",
			enabled: true
		},
		{
			key: "rest_username",
			value: "RESTAPI:WEBAPI:RestAPI",
			enabled: true
		},
		{
			key: "rest_password",
			value: "N3wS!t3forASC23!",
			enabled: true
		}
	],
	"_postman_variable_scope": "environment",
	"_postman_exported_at": "2023-04-04T19:22:20.537Z",
	"_postman_exported_using": "Postman/10.12.10"
}

const apiUrl = `https://azscicusaz0restprod.tnhs.cloud/tessituraservice` 
const username = "RESTAPI"
const usergroup ="WEBAPI" 
const machine = 'RestAPI';
const password = "N3wS!t3forASC23!" || process.env.TESS_API_PASSWORD as string;
const credentials = Buffer.from(`${username}:${usergroup}:${machine}:${password}`).toString('base64');

// Function to handle errors from Tessitura API
const handleTessituraError = (response: Response) => {
    console.error(`Error: HTTP Status Code: ${response.status}`);
    return response.json().then(data => {
        console.error(`Tessitura returned ${JSON.stringify(response)} errors`);
        console.error(`Tessitura responded: ${data.Error}`);
        throw new Error("Tessitura API error");
    });
};

// Function to fetch data from Tessitura API
export const fetchTess= async () => {
  if(credentials){
    const customApiEndpoint = '/custom/Attendance_Update?perf_dt=2024-01-05'
    const workingEndpoint = '/ReferenceData/PerformanceTypes/Summary'
    console.log(credentials, 'Credentials')
    try {
        const response = await fetch(apiUrl + customApiEndpoint, {
            
            cache: 'no-cache',
            method: 'GET',
            headers: {
              'Authorization': 'Basic ' + credentials,
              "Content-Type": "application/json",

            },
        });

        if (!response.ok) {
         // console.log(response)
            // Handle Tessitura API errors
            await handleTessituraError(response);
        }

        const xml = await response.text()
        const data = await convertXmlToJson(xml);

       // console.log(data, 'data')
       // console.log("Pricetypes:");
        //console.log("----------------------------------------------");
      return data
    } catch (error) {
        // Handle other errors (e.g., network issues, deserialization errors)
        console.error(error);
    }
  }
};

// Call the fetchData function
