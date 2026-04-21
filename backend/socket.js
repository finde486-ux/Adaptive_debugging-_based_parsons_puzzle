const { Server } = require('socket.io');
const { executePython } = require('./services/executor');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    const puzzleId = socket.handshake.query.puzzleId;
    console.log(`User connected for puzzle: ${puzzleId}`);

    socket.on('run', async ({ code }) => {
      console.log(`Running code for puzzle ${puzzleId}`);

      socket.emit('output', '\x1b[33m[Executing Python 3.11...]\x1b[0m\r\n');

      try {
        const { stdout, stderr } = await executePython(code);
        if (stdout) socket.emit('output', stdout.replace(/\n/g, '\r\n'));
        if (stderr) socket.emit('output', `\x1b[31m${stderr.replace(/\n/g, '\r\n')}\x1b[0m`);
        socket.emit('output', '\x1b[32m[Execution Complete]\x1b[0m\r\n');
      } catch (err) {
        socket.emit('output', `\x1b[31mError: ${err.message}\x1b[0m\r\n`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = initSocket;
