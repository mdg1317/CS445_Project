//creates server on port 3000
const io = require('socket.io')(3000)

//list of users currently connected to the chatroom
const users = {}
//calls this function when a user connects to the server
io.on('connection', socket => {
  //executes when the "new user" event occurs
  socket.on('new-user', name => {
    //adds new user's name to the list of names
    users[socket.id] = name
    //broadcasts message that a new user joined on the server
    socket.broadcast.emit('user-connected', name)
  })
  
  //executes during the send message event 
  socket.on('send-chat-message', message => {
    //broadcasts objects that store the message being sent and the name of the sender
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  
  //executes during the disconnect event
  socket.on('disconnect', () => {
    //broadcasts to the server that a user disconnected
    socket.broadcast.emit('user-disconnected', users[socket.id])
    //deletes user from list of users
    delete users[socket.id]
  })
})
