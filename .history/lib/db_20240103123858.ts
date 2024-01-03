const credintials = "restweb:webapi:location1:pwd123"
const restAPIUrl = `https://azscicusaz0restprod.tnhs.cloud/tessituraservice` 
const userName = "restweb"
const userGroup = "webapi" || "webAPI"
const machineName = "875"
const tessApiPW = process.env.TESS_API_PASSWORD as string


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
