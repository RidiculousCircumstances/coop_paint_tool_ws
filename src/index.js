const btn = document.getElementById('btn');
const socket = new WebSocket('ws://localhost:5000/');

socket.onopen = () => {
	console.log('Opened!');
}

socket.onmessage = (e) => {
	console.log('Incoming message: ',e.data);
}

btn.onclick = () => {
	socket.send(JSON.stringify({
		fuck: 'yess',
		id: 777777,
		method: 'connection',
		username: 'Billy'
	}));
}