const express = require("express");
const path = require("path");
const ws = require("ws");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "62Jyx72S",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser);

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

const wsServer = new ws.Server({ noServer: true });
const sockets = [];
wsServer.on("connection", (socket) => {
  console.log("Client connected");
  sockets.push(socket);
  socket.on("message", (message) => {
    for (const socket of sockets) {
      socket.send("From server: " + message);
    }
  });
});

const server = app.listen(3000, () => {
  console.log(
    `Server started on port http://localhost:${server.address().port}`
  );
  server.on("upgrade", (req, res, head) => {
    wsServer.handleUpgrade(req, res, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});

app.get("/api/profile", (req, res) => {
  const { username } = req.session; // = "Student fra serveren";
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username: username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  res.session.username = username;
  res.end();
});
