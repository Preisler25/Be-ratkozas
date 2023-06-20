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

let desk1_needs = ['alma']
let desk2_needs = []
let desk3_needs = []

let need_help = () =>{
    for (let i = 0; i < helper_list.length; i++) {
        io.to(helper_list[i]).emit('Task1', desk1_needs);
        io.to(helper_list[i]).emit('Task2', desk2_needs);
        io.to(helper_list[i]).emit('Task3', desk3_needs);
    }
}

let get_history = () =>{
    for (let i = 0; i < desk1_list.length; i++) {
        io.to(desk1_list[i]).emit('History', desk1_needs);
    }
    for (let i = 0; i < desk2_list.length; i++) {
        io.to(desk2_list[i]).emit('History', desk2_needs);
    }
    for (let i = 0; i < desk3_list.length; i++) {
        io.to(desk3_list[i]).emit('History', desk3_needs);
    }
}


io.on('connection', (socket: Socket) => {
    socket.emit('connected', 'You are connected!');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        //delet user from every list
        helper_list = helper_list.filter(item => item !== socket.id)
        desk1_list = desk1_list.filter(item => item !== socket.id)
        desk2_list = desk2_list.filter(item => item !== socket.id)
        desk3_list = desk3_list.filter(item => item !== socket.id)
    });

    // --------------- helper ------------------
    socket.on('helper', () => {
        helper_list.push(socket.id)
        need_help()
    });

    // --------------- desk1 ------------------
    socket.on('desk1', () => {
        desk1_list.push(socket.id)
        console.log(desk1_list);
        get_history()
    });

    socket.on('desk1Need', (message: string) => {
        desk1_needs.push(message)
        console.log(desk1_needs);
        need_help()
        get_history()
    });

    socket.on('del1', (id: number) => {
        console.log(id);
        console.log(desk1_needs);
        if (id >= 0 && id < desk1_needs.length) {
            desk1_needs.splice(id, 1);
            need_help();
            get_history();
        }
    });
    

    // --------------- desk2 ------------------
    socket.on('desk2', () => {
        desk2_list.push(socket.id)
        get_history()
    });

    socket.on('desk2Need', (message: string) => {
        desk2_needs.push(message)
        need_help()
        get_history()
    });

    socket.on('del2', (id: number) => {
        if (id >= 0 && id < desk2_needs.length) {
            desk2_needs.splice(id, 1);
            need_help();
            get_history();
        }
    });

    // --------------- desk3 ------------------
    socket.on('desk3', () => {
        desk3_list.push(socket.id)
        get_history()
    });

    socket.on('desk3Need', (message: string) => {
        desk3_needs.push(message)
        need_help()
        get_history()
    });

    socket.on('del3', (id: number) => {
        if (id >= 0 && id < desk3_needs.length) {
            desk3_needs.splice(id, 1);
            need_help();
            get_history();
        }
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
