// Ellenőrizzük, hogy a böngésző támogatja-e a Push API-t
if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            navigator.serviceWorker.register('service-worker.js'); // A service-worker.js fájl helyét módosítsd a saját projektedhez
        }
    });
}

const socket = io(window.location.origin);

socket.on('connect', () => {
    socket.emit('helper', 'helper connected');

    socket.on('Task1', (data) => {
        console.log(data);
        document.getElementById('task1').innerHTML = '<h1>Asztal1</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task1').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay1(${i})">🏃</button> <button class="btn" onclick="del1(${i})">✅</button></li>`;
        }
        showNotification('Új feladat érkezett', 'Asztal1');
    });

    socket.on('Task2', (data) => {
        console.log(data);
        document.getElementById('task2').innerHTML = '<h1>Asztal2</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task2').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay2(${i})">🏃</button> <button class="btn" onclick="del2(${i})">✅</button></li>`;
        }
        showNotification('Új feladat érkezett', 'Asztal2');
    });

    socket.on('Task3', (data) => {
        console.log(data);
        document.getElementById('task3').innerHTML = '<h1>Asztal3</h1>';
        for (let i = 0; i < data.length; i++) {
            document.getElementById('task3').innerHTML += `<li> ${data[i]} <button class="btn" onclick="onMyWay3(${i})">🏃</button> <button class="btn" onclick="del3(${i})">✅</button></li>`;
        }
        showNotification('Új feladat érkezett', 'Asztal3');
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

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(permission => {
                console.log("geci")
                if (permission === 'granted') {
                    console.log("kueva")
                    showNotification('Welcome!', 'Thank you for enabling notifications.');
                }
            })
            .catch(error => {
                console.error('Failed to request notification permission:', error);
            });
    }
}