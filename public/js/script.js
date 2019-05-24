console.log("javascript file working")
var socket = io();

socket.on('message', (message) => {
    console.log(message)
})

socket.on('init', (message) => {
    console.log("here is an initiate message" + message.content)
    console.log(message.stuff);
})


var getcallbutton = document.querySelector('#getcall')

getcallbutton.addEventListener('click', () => {
    console.log('getcallbutton clicked')
    socket.emit('getcall')
});



//this is all that you need to start a tokbox session with the html already provided.
// to use this you need to use the code block below -albeit modified slightly
// $(document).ready(function() {
//     $("#startbutton").click(function() {
//       var socket = io();
//       socket.on('go',(apiKey, sessionId, token) => {
//       initializeSession(apiKey,sessionId,token);
//       })
  
//     });
//   });
// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
function initializeSession(apiKey,sessionId,token) {
   var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
      session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    });
  
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }