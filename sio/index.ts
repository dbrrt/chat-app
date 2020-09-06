var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const Redis = require("ioredis");
let interval: any = null;
const LIST_CACHE_USERS = 'connected_users'

export interface MessageObject {
  sender: string | null;
  recipient: string | null;
  message: {
      type: string;
      payload: string;
  },
  ts: string
}

const REDIS_CFG = {
    host: process.env.REDIS_HOSTNAME,
    lazyConnect: false,
    enableOfflineQueue: true
  }

const clearUsersList = () => {
  const redis = new Redis(REDIS_CFG)

  redis.on('connect', async () => {
    await redis.ltrim(LIST_CACHE_USERS, -1, 0)
    await redis.quit()
  })
}

setInterval(() => clearUsersList(), 25000);

io.on("connection", (socket: any) => {
  // console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  socket.on('join', (room: string) => {
    // console.log(`ROOM [${room}]`)
    socket.join(room);
  });

  socket.on("MESSAGE_HANDLER", (payload: MessageObject) => {
    const ROOM = [payload?.recipient, payload?.sender].sort().join('___').toUpperCase()
    socket.to(ROOM).emit('MESSAGE_BROADCAST', payload)
  });

  socket.on("USER_HEARTBEAT", (username: string) => {
      const redis = new Redis(REDIS_CFG)

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
  
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
    clearInterval(interval);
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
