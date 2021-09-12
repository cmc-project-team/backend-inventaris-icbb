const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const app = require('./app');
const server = http.createServer(app);
server.listen(port);
console.log(`${port}`);