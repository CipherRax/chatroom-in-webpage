const sendBtn = document.querySelector('#send');
const messages = document.querySelector('#messages');
const messageBox = document.querySelector('#messageBox');
let ws;

function showMessage(message) {
    messages.textContent += `\n${message}`;
    messages.scrollTop = messages.scrollHeight;
    messageBox.value = '';
}

function init() {
    ws = new WebSocket('ws://localhost:5000');
    ws.onopen = () => console.log('Connection opened!');
    ws.onmessage = ({ data }) => showMessage(data);
    ws.onclose = () => ws = null;
}

sendBtn.onclick = function() {
    if (!ws) {
        showMessage("No WebSocket connection :(");
        return;
    }
    ws.send(messageBox.value);
    showMessage(messageBox.value);
};

init();