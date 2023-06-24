const socket = io();
const messages = document.getElementById('messages');
const messagesForm = document.getElementById('messagesForm');
const userEmail = "{{userEmail}}";

socket.on('new message', (data) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.user}</strong>: ${data.message}`;
    messages.appendChild(li);
});

socket.on('old messages', (data) => {
    data.forEach((message) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${message.user}</strong>: ${message.message}`;
        messages.appendChild(li);
    });
});

messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.querySelector('input[name="message"]');
    const message = messageInput.value;

    const data = {
        user: userEmail,
        message: message
    };
    
    socket.emit('send message', data);
    messageInput.value = '';
    messageInput.focus();
});