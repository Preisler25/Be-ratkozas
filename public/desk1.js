const socket = io('http://192.168.1.199:3000');

socket.on('connect', () => {
    // Az eseményekhez tartozó kódok ide kerülnek
    socket.emit('desk1', 'desk1 connected');
    socket.on('History', (data) => {
        console.log(data);
        document.getElementById('history').innerHTML = '';
        for(let i = 0; i < data.length; i++) {
            document.getElementById('history').innerHTML += `<li> ${data[i]} <button class="btn" onclick="del(${i})">✅</button></li>`;
        }
    });
});

socket.on('disconnect', () => {
    console.log('Kapcsolat megszakadt');
});


let del = (i) => {
    socket.emit('del1', i);
}

let needHelp = () => {
    socket.emit('desk1Need', 'desk1 needs help');
}

let needTanu = () => {
    socket.emit('desk1Need', 'desk1 needs 18+');
}