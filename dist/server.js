"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('message', (message) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });
});
app.get('/', (req, res) => {
    res.send('Hello, Socket.IO!');
});
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
