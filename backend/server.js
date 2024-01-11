const connectDB = require('./config/db');
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require('./middleware/error');
const cors = require("cors");
const port = process.env.PORT || 5000;
const path = require('path');
const { Server } = require("socket.io");

require('dotenv').config();
connectDB();

const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  socket.on("new-album-notification", data => {
    socket.broadcast.emit("show-new-album-notification", data);
  })
})

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', require('./routes/user'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/album', require('./routes/album'));
app.use('/api/playlist', require('./routes/playlist'));
app.use('/api/search', require('./routes/search'));
app.use('/api/genre', require('./routes/genre'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));
