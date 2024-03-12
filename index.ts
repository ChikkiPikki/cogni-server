import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const IO = new Server(server, { cors: { origin: "*" } });

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

var controls = {
  front: 0,
  reverse: 0,
  right: 0,
  left: 0,
};

app.get("/", (req: Request, res: Response) => {
  res.render("home.ejs");
});

app.get("/data", (req: Request, res: Response) => {
  res.send(JSON.stringify(controls));
  console.log(JSON.stringify(controls));
});

IO.on("connection", (socket: Socket) => {
  console.log(`Connected to ${socket.id}`);
  socket.on("controls", async (data) => {
    console.log(data);
    controls = data;
    console.log(controls);
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
