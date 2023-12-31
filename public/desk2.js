const socket = io(window.location.origin);

socket.on('connect', () => {
    // Az eseményekhez tartozó kódok ide kerülnek
    socket.emit('desk2', 'desk2 connected');
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
    socket.emit('del2', i);
}

let needHelp = () => {
    socket.emit('desk2Need', 'Help');
}

let needTanu = () => {
    socket.emit('desk2Need', '18+');
}
