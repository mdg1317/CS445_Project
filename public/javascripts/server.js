// This is a filler comment for Github
const server = require('server');
const { get, socket } = server.router;
const { render } = server.reply;

// Update everyone with the current user count
const updateCounter = ctx => {
	ctx.io.emit('count', Object.keys(ctx.io.sockets.sockets).length);
};


server([
	get('/', ctx => render('index.html')),
  	//Socket router to call the updateCounter method when a new user joins the room
	socket('connect', updateCounter),
  	//socket router to call the updateCounter method when a user leaves the chatroom
	socket('disconnect', updateCounter),
	//socket router to send a message 
  	socket('message', ctx => {
    		console.log(ctx.data);
    		ctx.io.emit('message', ctx.data);
  	})
]);
