const express = require("express");
const ws = require("ws");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

let index = 0;
const sockets = [];

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (msg) => {
    const { firstname, message, email, lastname } = JSON.parse(msg);
    const id = index++;
    for (const recipient of sockets) {
      recipient.send(
        JSON.stringify({ id, firstname, message, email, lastname })
      );
    }
  });
});

const server = app.listen(3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});
