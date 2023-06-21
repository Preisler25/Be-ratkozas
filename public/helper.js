const socket = io(window.location.origin);

if ('Notification' in window) {
    // Engedélyezd a push értesítéseket
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            // Regisztrálj egy service worker-t

        }
    });
}

socket.on('connect', () => {
    // Az eseményekhez tartozó kódok ide kerülnek
    socket.emit('helper', 'helper connected');
    socket.on('Task1', (data) => {
        console.log(data);
        document.getElementById('task1').innerHTML = '<h1>Asztal1</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task1').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay1(${i})">🏃</button> <button class="btn" onclick="del1(${i})">✅</button></li>`;
        }
    });
    socket.on('Task2', (data) => {
        console.log(data);
        document.getElementById('task2').innerHTML = '<h1>Asztal2</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task2').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay2(${i})">🏃</button> <button class="btn" onclick="del2(${i})">✅</button></li>`;
        }
    });
    socket.on('Task3', (data) => {
        console.log(data);
        document.getElementById('task3').innerHTML = '<h1>Asztal3</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task3').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay3(${i})">🏃</button> <button class="btn" onclick="del3(${i})">✅</button></li>`;
        }
    });
});

socket.on('disconnect', () => {
    console.log('Kapcsolat megszakadt');
});


let del1 = (i) => {
    socket.emit('del1', i);
}

let del2 = (i) => {
    socket.emit('del2', i);
}
let del3 = (i) => {
    socket.emit('del3', i);
}

let onMyWay1 = (i) => {
    socket.emit('onMyWay1', i);
}

let onMyWay2 = (i) => {
    socket.emit('onMyWay2', i);
}

let onMyWay3 = (i) => {
    socket.emit('onMyWay3', i);
}
