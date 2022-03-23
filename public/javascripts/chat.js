var ws_url = "ws://10.17.6.221:5000";
var websocket = new WebSocket(ws_url);

websocket.onopen = function(event){
	alert("[open] Connection established");
	alert("Sending to server");
	MessageAdd('<div class="message green">You have entered the chatroom.</div>');
};

websocket.onclose = function(event){
	MessageAdd('<div class="message blue">You have been disconnected.</div>');
};

websocket.onerror = function(event){
	MessageAdd('<div class="message red">Connection to chat failed.</div>');
};

websocket.onmessage = function(event){
	var data = JSON.parse(event.data);
	if(data.type == "message"){
		MessageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
	}
};

document.getElementById("char-form").addEventListener("submit", function(event) {
	event.preventDefault();

	var message_element = document.getElementsByTagName("input")[0];
	var message = message_element.value;

	if(message.toString().length) {
		var username = localStorage.getItem("username");
		var data = {
			type: "message",
			username: username,
		};

		websocket.send(JSON.stringify(data));
		message_element.value = "";
	}
}, false);

function Username() {
	var username = window.prompt("Enter your username:", "");

	if(username.toString().length > 2){
		localStorage.setItem("username", username);
	} else {
		alert("Your username must be at least two characters");
		Username();
	}
}

Username();

function MessageAdd(message) {
	var char_messages = document.getElementById("chat-messages");
	chat_messages.insertAdjacentHTML("beforeend", message);
	chat_messages.scrollTop = chat_messages.scrollHeight;
}