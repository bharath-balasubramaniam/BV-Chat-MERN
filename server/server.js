const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const userRoutes = require("./routes/userRoutes");

const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { Socket } = require("socket.io");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running successfully");
});
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started on Port: ${PORT} `)
);

const io = require("socket.io")(server, {
  cors: { origin: "https://bv-chat.netlify.app" },
  pingTimeOut: 60000,
});

io.on("connection", (Socket) => {
  console.log("connected to socket.io");
  Socket.on("setup", (userData) => {
    Socket.join(userData._id);
    Socket.emit("connected");
  });
  Socket.on("join chat", (room) => {
    Socket.join(room);
    console.log("user joined room : " + room);
    // Socket.emit("connected");
  });

  Socket.on("typing", (room) => Socket.in(room).emit("typing"));
  Socket.on("stop typing", (room) => Socket.in(room).emit("stop typing"));

  Socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      Socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  Socket.off("setup", () => {
    console.log("user disconnected");
    Socket.leave(userData._id);
  });
});
