//socket variable storing location where the server is hosting the application
const socket = io('http://localhost:3000')
//variable which represents a section of the html page were messages sent from other users go
const messageContainer = document.getElementById('message-container')
//variable that represents all the parts of the html page where all the things releating to the user sending a message are
const messageForm = document.getElementById('send-container')
//senction of the html page where user types the message they want to send
const messageInput = document.getElementById('message-input')

//prompts user to enter a username
const name = prompt('Enter your username: ')
//appends a message to user's screen saying they joined
appendMessage('You joined')
//sends the name of the new user to the server, titles the event "new-user" so the server knows what to do with this information
socket.emit('new-user', name)

//this triggers when the chat-message occurs, or when a someone sends a new message
socket.on('chat-message', data => {
  //appends the message to the user's screen along with the name of the sender
  appendMessage(`${data.name}: ${data.message}: ${data.date}`)
})
//this triggers when the "user-connected" message occurs, or when a new user joins the chatroom
socket.on('user-connected', name => {
  //posts to the user's screen a message saying who joined
  appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

//listener event that listens to the submit button
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  //message meant to be sent
  const message = messageInput.value
  //this event triggers when a user tries to send a message by clicking the submit button
  //when this happens, we call appendMessage to post some text to their screen saying that they sent a message
  appendMessage(`You: ${message}`)
  //send the message to the server and
  //titles the name of this event "send-chat-message" so the server knows how to process it
  socket.emit('send-chat-message', message)
  //resets the value of message input after message sucessfully sent
  messageInput.value = ''
})

//function that posts the arguement to the html page by creating a new div on the html page and setting the text within that div to the arguement
function appendMessage(message) {
  //set variable equal to the string that appendMessage is being called on
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  //append the message to a messageContainer object
  messageContainer.append(messageElement)
}
