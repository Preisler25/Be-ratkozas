const socket = io('http://localhost:3000');

socket.on('connect', () => {
    socket.emit('desk1', 'desk1 connected');
});

socket.on('History', (data) => {
    console.log(data);
    data.forEach(element => {
            document.getElementById('history').innerHTML += '<li>' + element + '</li>';
    });
});

let needHelp = () => {
    socket.emit('desk1Need', 'desk1 need help');
}

let needTanu = () => {
    socket.emit('desk1Need', 'desk1 need 18+');
}