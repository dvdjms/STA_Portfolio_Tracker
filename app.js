import http from 'http';
import fetch from 'node-fetch'; // is this needed?

import {secret_key, email} from './secret_key.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});


fetch('https://sta2020.atlassian.net/rest/api/latest/project/', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      email + ':' + secret_key)
      .toString('base64')}`,
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    return response.json();
  })
  .then(data => {
      console.log('Number of items:', data.length);
      for (let i = 0; i < data.length; i++){
            console.log('Project no.',i + 1, data[i].name)
      }
  })
  .catch(err => console.error(err));
  
// Obtain post codes and perhaps use with Google Maps




server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
