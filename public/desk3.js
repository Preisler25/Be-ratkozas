const socket = io(window.location.origin);

socket.on('connect', () => {
    // Az eseményekhez tartozó kódok ide kerülnek
    socket.emit('desk3', 'desk3 connected');
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
    socket.emit('del3', i);
}

let needHelp = () => {
    socket.emit('desk3Need', 'desk3 needs help');
}

let needTanu = () => {
    socket.emit('desk3Need', 'desk3 needs 18+');
}
