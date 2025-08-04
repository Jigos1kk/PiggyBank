require('dotenv').config();
const { Server } = require('socket.io')

const PORT = process.env.WS_PORT;

class SocketIoServer {
    constructor() {
        this.io = new Server(PORT, {
            cors: {
                origin: "*",
            },
        })

        this.io.on('connection', (socket) => {
            console.log('WS: клиент подключен:', socket.id)

            socket.on('join', (room) => {
                socket.join(room);
                console.log(`Клиент ${socket.id} присоединился к комнате: ${room}`)
            })

            socket.on('leave', (room) => {
                socket.leave(room);
            })

            socket.on('disconnect', () => {
                console.log('Socket.IO клиент отключён:', socket.id);
            });
        })

        this.io.on('listening', () => {
            console.log(`Socket.IO сервер запущен на порту ${PORT}`);
        })
    }

    /**
   * Отправить сообщение всем в комнате (канале)
   * @param {string} room
   * @param {string} event
   * @param {any} data
   */
    sendToRoom(room, event, data) {
        this.io.to(room).emit(event, data);
    }

    /**
     * Отправить сообщение всем клиентам
     * @param {string} event
     * @param {any} data
     */
    broadcast(event, data) {
        this.io.emit(event, data);
    }
}

module.exports = SocketIoServer;