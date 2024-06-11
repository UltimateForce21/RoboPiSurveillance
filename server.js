const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const hexBuffer = [0x7b, 0x22, 0x6b, 0x65, 0x79, 0x22, 0x3a, 0x22, 0x41, 0x72, 0x72, 0x6f, 0x77, 0x52, 0x69, 0x67, 0x68, 0x74, 0x22, 0x2c, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x3a, 0x22, 0x75, 0x70, 0x22, 0x7d];
    console.log('Received:', message);
    console.log(message.length)
    console.log("Message type = ", message[message.length-1])
    // Handle the message (e.g., control the car)
    matches = true;
    for(i = 0; i <  hexBuffer.length; i++){
      if(!message[i] || message[i] != hexBuffer[i]){
        matches = false;
        break;
      }
    } 
    if(matches){
      console.log("Right letgo")
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening at http://raspberrypi:3000');
});
