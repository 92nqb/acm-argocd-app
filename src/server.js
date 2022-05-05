#!/usr/bin/env node
const http = require('http');

const requestListener = function (req, res) {
  const iprequest = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  console.log(`Incoming request IP_REQ=${iprequest}`);

  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hi ${process.env.TITLE}</title>
      <style>
            .center {
                text-align: center;
            }
            .parent {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100vh;
            }
      </style>
  </head>
  <body>
      <div class="parent">
        <h1 class="center">${process.env.TITLE}</h1>
        <p class="center">${process.env.DESCRIPTION}</p>
      </div>
  </body>
  </html>
  `);
}

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});