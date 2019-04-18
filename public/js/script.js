console.log("javascript file working")
var socket = io();

socket.on('message', (message) => {
    console.log(message)
})


var getcallbutton = document.querySelector('#getcall')

getcallbutton.addEventListener('click', () => {
    console.log('getcallbutton clicked')
    socket.emit('getcall')
});

