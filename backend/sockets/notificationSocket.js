/**
 * Socket.IO Notification & Real-time Event Handler
 * @param {import('socket.io').Server} io
 */
const initNotificationSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`[Socket.IO] New client connected: ${socket.id}`);

    // Join user-specific notification room
    socket.on('join', (userId) => {
      if (userId) {
        socket.join(`user_${userId}`);
        console.log(`[Socket.IO] Socket ${socket.id} joined room user_${userId}`);
      }
    });

    // Handle real-time ping / health check
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date() });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = initNotificationSocket;
