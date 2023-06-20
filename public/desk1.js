const socket = io('http://localhost:3000');

socket.on('connect', () => {
    socket.emit('desk1', 'desk1 connected');
});

socket.on('History', (data) => {
    console.log(data);
    data.forEach(element => {
        if(element.desk == 'desk1'){
            $('#history').append('<li>'+element.desk+' : '+element.message+'</li>');
        }
    });
});