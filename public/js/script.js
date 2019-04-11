console.log("javascript file working")
var socket = io();





var getcallbutton = document.querySelector('#getcall')

getcallbutton.addEventListener('click', () => {
    console.log('getcallbutton clicked')
    socket.emit('getcall')
});

