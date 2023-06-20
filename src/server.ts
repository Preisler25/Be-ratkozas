import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.join(__dirname, '../public')));

let helper_list = []
let desk1_list = []
let desk2_list = []
let desk3_list = []

let desk1_needs = []
let desk2_needs = []
let desk3_needs = []

io.on('connection', (socket: Socket) => {
    socket.emit('connected', 'You are connected!');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('helperJoin', () => {
        helper_list.push(socket.id)
    });

    socket.on('desk1', () => {
        desk1_list.push(socket.id)
        console.log(desk1_list)
    });

    socket.on('desk2', () => {
        desk2_list.push(socket.id)
    });

    socket.on('desk3', () => {
        desk3_list.push(socket.id)
    });

    socket.on('helperDisconnect', () => {
        helper_list = helper_list.filter(item => item !== socket.id)
    });

    socket.on('desk1Disconnect', () => {
        desk1_list = desk1_list.filter(item => item !== socket.id)
    });

    socket.on('desk2Disconnect', () => {
        desk2_list = desk2_list.filter(item => item !== socket.id)
    });

    socket.on('desk3Disconnect', () => {
        desk3_list = desk3_list.filter(item => item !== socket.id)
    });

    socket.on('deskMessage', (message: string) => {
        console.log('Received message:', message);

        for (let i = 0; i < helper_list.length; i++) {
            io.to(helper_list[i]).emit('Task', message);
        }
    });

    socket.on('message', (message: string) => {
        console.log('Received message:', message);
        io.emit('message', message);
    });
});

app.get('/join', (req: Request, res: Response) => {
    if (!req.query.q) {
        return res.status(400).send('Missing query parameter: q');
    }
    else if (req.query.q == 'h') {
        res.sendFile(path.join(__dirname, '../public/helper.html'));
    }
    else if (req.query.q == '1') {
        res.sendFile(path.join(__dirname, '../public/desk1.html'))
    }
    else if (req.query.q == '2') {
        res.sendFile(path.join(__dirname, '../public/desk2.html'))
    }
    else if (req.query.q == '2') {
        res.sendFile(path.join(__dirname, '../public/desk3.html'))
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
