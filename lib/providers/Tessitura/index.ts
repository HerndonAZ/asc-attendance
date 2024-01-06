const username = process.env.TESSITURA_USERNAME;
const machine = process.env.TESSITURA_MACHINE;
const apiUrl = process.env.TESSITURA_URL;
const password = process.env.TESSITURA_API_PASSWORD;
const usergroup = process.env.TESSITURA_USERGROUP;
const credentials = Buffer.from(
  `${username}:${usergroup}:${machine}:${password}`
).toString('base64');

const handleTessituraError = (response: Response) => {
  console.error(`Error: HTTP Status Code: ${response.status}`);
  return response.json().then((data) => {
    console.error(`Tessitura returned ${JSON.stringify(response)} errors`);
    console.error(`Tessitura responded: ${data.Error}`);
    throw new Error('Tessitura API error');
  });
};

export { credentials, apiUrl, handleTessituraError };
