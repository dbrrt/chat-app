var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

http.listen(3050, () => {
  console.log('listening on *:3050');
});