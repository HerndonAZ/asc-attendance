const restAPIUrl = `https://azscicusaz0restprod.tnhs.cloud/tessituraservice` 
const userName = "restweb"
const userGroup = "webapi" || "webAPI"
const machineName = "875"
const tessApiPW = process.env.TESS_API_PASSWORD as string
const credentials = `${userName}:${userGroup}:${machineName}:${tessApiPW}`


export const fetchTessitura = async () => {
  try {
    const query = `/custom/Attendance_Update/?perf_dt=2023-09-30`;
    const query2 = ""
    const res = await fetch(restAPIUrl + query, {
      method: "GET",
      //body: "",
     // headers: ""
    });
    if (res.ok) {
      return res;
    }
  } catch (error) {
    console.log(error, 'ERROR')
    return null
  }
};

const apiUrl = `https://azscicusaz0restprod.tnhs.cloud/tessituraservice` 
const username = "restweb"
const usergroup ="webapi" || "webAPI"
const machine = "875";
const password = process.env.TESS_API_PASSWORD as string;

// Function to handle errors from Tessitura API
const handleTessituraError = (response: Response) => {
    console.error(`Error: HTTP Status Code: ${response.status}`);
    return response.json().then(data => {
        console.error(`Tessitura returned ${data.ErrorMessages.length} errors`);
        console.error(`Tessitura responded: ${data.Error}`);
        throw new Error("Tessitura API error");
    });
};

// Function to fetch data from Tessitura API
export const fetchTess= async () => {
    try {
        const response = await fetch(`${apiUrl}/TXN/PriceTypes/GetSummaries`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${username}:${usergroup}:${machine}:${password}`)
            },
        });

        if (!response.ok) {
            // Handle Tessitura API errors
            await handleTessituraError(response);
        }

        const data = await response.json();
        console.log("Pricetypes:");
        console.log("----------------------------------------------");
      return  data.forEach((v: { Description: any }) => {
            console.log(v.Description);
        });
    } catch (error) {
        // Handle other errors (e.g., network issues, deserialization errors)
        console.error(error);
    }
};

// Call the fetchData function