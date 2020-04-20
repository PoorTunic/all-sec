const express = require("express");
const app = express();
const morgan = require("morgan");

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const engine = require("ejs-mate");
const path = require("path");

app.set("views", path.join(__dirname, "public", "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.use(morgan("common"));

app.use("/", require("./router/index"));

http.listen(port, () => {
  console.log("Server on %d port", port);
});

io.on("connection", (socket) => {
  socket.on("streaming1", (image) => {
    io.emit("play stream1", image);
  });

  socket.on("streaming2", (image) => {
    io.emit("play stream2", image);
  });
});

//static files
app.use(express.static(path.join(__dirname, "public")));
