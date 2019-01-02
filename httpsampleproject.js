

const http = require('http'); 
const { parse } = require('querystring');
const port = 3000;
const hostname = '127.0.0.1'; 


// const https = require('https');

// https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => 
// {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data));
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


// get using request
const request = require('request');

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});



const server = http.createServer((req, res) => 
{ 
if (req.method === 'POST') 
{ 
collectRequestData(req, result => {
console.log(result); 
res.end(`Parsed data belonging to ${result.fname}`);
 });  
} 
else 
{
res.end(` <!doctype html> 
<html>
 <body>
  <form action="/" method="post">
   Name<input type="text" name="fname" /><br />
    Age<input type="number" name="age" /><br />
     <input type="file" name="photo" /><br /> 
     <button>Save</button> 
  </form> 
 </body> 
</html> `); 
} 
}); 
server.listen(port, hostname, () => 
{
 console.log(`Server running at http://${hostname}:${port}/`); 
});   
function collectRequestData(request, callback) 
{
const FORM_URLENCODED = 'application/x-www-form-urlencoded'; 

if(request.headers['content-type'] === FORM_URLENCODED)
{
let body = '';
request.on('data', chunk =>
{
body += chunk.toString(); }); 
request.on('end', () => {
callback(parse(body)); }); 
}
else 
{ 
callback(null);
}
}