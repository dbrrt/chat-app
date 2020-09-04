var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Redis = require("ioredis");


let interval: any = null;

const getApiAndEmit = (socket: any) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

io.on("connection", (socket: any) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  socket.on("USER_HEARTBEAT", (data: any)=>{
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    const redis = new Redis({
      host: process.env.REDIS_URI,
      lazyConnect: false,
      enableOfflineQueue: true
    })

    redis.on('error', () => {
      redis.disconnect()
    })

    redis.on('connect', () => {})
      console.log('connected to redis')
    });

  // interval = setInterval(() => getApiAndEmit(socket), 100);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});


// io.on('CHAT_USER_HEARTBEAT', (socket: any) => {
//   console.log(socket)
// })

http.listen(8080, () => {
  console.log('listening on *:8080');
});