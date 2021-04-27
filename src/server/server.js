const express = require("express");
const ws = require("ws");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

let index = 0;
const sockets = [];

const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (msg) => {
    const { username, message, email, lastname } = JSON.parse(msg);
    const id = index++;
    for (const recipient of sockets) {
      recipient.send(
        JSON.stringify({ id, username, message, email, lastname })
      );
    }
  });
});

const profiles = [
  {
    id: 1,
    username: "Server 1",
    email: "server1@mail.no",
    lastname: "Serversen",
  },
  {
    id: 2,
    username: "Server 2",
    email: "server2@mail.no",
    lastname: "Serversen",
  },
];

app.get("/api/profiles", (req, res) => {
  res.json(profiles);
});

app.post("/api/profiles", (req, res) => {
  const { username, email, lastname } = req.body;
  profiles.push({ username, email, lastname, id: profiles.length + 1 });
  res.status(201).end();
});

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const server = app.listen(3000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});
