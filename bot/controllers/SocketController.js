require('dotenv').config();
const { io } = require('socket.io-client');

class SocketController {
  /**
   * @param {string} serverUrl - URL сокет-сервера
   * @param {object} [options] - socket.io-client options
   */
  constructor(serverUrl = process.env.SOCKET_SERVER_URL, options = {}) {
    this.serverUrl = serverUrl;
    this.options = options;
    this.socket = null;
  }

  /**
   * Подключение к сокет-серверу
   */
  connect() {
    this.socket = io(this.serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      ...this.options,
    });

    this.socket.on('connect', () => {
      console.log(`[SOCKET CLIENT] Connected to ${this.serverUrl} (id: ${this.socket.id})`);
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`[SOCKET CLIENT] Disconnected: ${reason}`);
    });

    // Логировать все входящие события
    this.socket.onAny((event, ...args) => {
      console.log(`[SOCKET CLIENT] Event: ${event}`, ...args);
    });
  }

  /**
   * Присоединиться к комнате
   * @param {string} roomName - Имя комнаты
   */
  joinRoom(roomName) {
    if (!this.socket) {
      console.error('[SOCKET CLIENT] Socket not connected. Call connect() first.');
      return;
    }
    this.socket.emit('join', roomName, (ack) => {
      console.log(`[SOCKET CLIENT] Join room "${roomName}" ack:`, ack);
    });
  }

  /**
   * Отключиться от сервера
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

module.exports = new SocketController();