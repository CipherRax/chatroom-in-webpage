const net = require('net');

const clients = [];
const server = net.createServer((socket) => {
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    clients.push(socket);

    socket.write("Welcome " + socket.name + "\n");
    broadcast(socket.name + " joined the chat\n", socket);

    socket.on('data', (data) => {
        broadcast(socket.name + "> " + data, socket);
    });

    socket.on('end', () => {
        clients.splice(clients.indexOf(socket), 1);
        broadcast(socket.name + " left the chat.\n");
    });

    function broadcast(message, sender) {
        clients.forEach((client) => {
            if (client !== sender) {
                client.write(message);
            }
        });
        process.stdout.write(message);
    }
});

server.listen(5000, () => {
    console.log("Chat server running at port 5000\n");
});