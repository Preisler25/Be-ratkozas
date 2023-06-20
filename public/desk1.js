const socket = io('http://localhost:3000');

socket.on('connect', () => {
    // Az eseményekhez tartozó kódok ide kerülnek
    socket.emit('desk1', 'desk1 connected');
    socket.on('History', (data) => {
        console.log(data);
        document.getElementById('history').innerHTML = '';
        data.forEach(element => {
            document.getElementById('history').innerHTML += '<li>' + element + '</li>';
        });
    });
});

socket.on('disconnect', () => {
    console.log('Kapcsolat megszakadt');
});


let needHelp = () => {
    socket.emit('desk1Need', 'desk1 need help');
}

let needTanu = () => {
    socket.emit('desk1Need', 'desk1 need 18+');
}