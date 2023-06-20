const socket = io('localhost:3000');

socket.on('connect', () => {
    socket.emit('desk1', 'desk1 connected');
    alert('desk1 connected');
});