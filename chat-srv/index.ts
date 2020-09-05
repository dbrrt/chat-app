import { cpuUsage } from "process";

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const Redis = require("ioredis");


let interval: any = null;

const LIST_CACHE_USERS = 'connected_users'


const clearUsersList = () => {
  const redis = new Redis({
    host: process.env.REDIS_HOSTNAME,
    lazyConnect: false,
    enableOfflineQueue: true
  })

  redis.on('connect', async () => {
    await redis.ltrim(LIST_CACHE_USERS, -1, 0)
    await redis.quit()
  })
}

setInterval(() => clearUsersList(), 25000);

io.on("connection", (socket: any) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  socket.on("MESSAGE_HANDLER", (payload: any) => {
    console.log(payload);
  });

  socket.on("USER_HEARTBEAT", (username: string)=>{
      const redis = new Redis({
        host: process.env.REDIS_HOSTNAME,
        lazyConnect: false,
        enableOfflineQueue: true
      })

      redis.on('error', (e: any) => {
        console.log(e)
        redis.disconnect()
      })

      redis.on('connect', async () => {
        const elements = await redis.lrange(LIST_CACHE_USERS, 0, -1)

        if (!elements.includes(username)) {
          await redis.lpush(LIST_CACHE_USERS, username)
        }
        const CONNECTED_USERS =  await redis.lrange(LIST_CACHE_USERS, 0, -1)
        socket.emit('CONNECTED_USERS', CONNECTED_USERS)
        await redis.quit()
      })
      
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