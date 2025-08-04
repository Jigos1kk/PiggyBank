const SocketIoServer = require('./websocket/SocketIoServer');

const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

const socketServer = new SocketIoServer();

app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});