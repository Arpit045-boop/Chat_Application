const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const temp = document.getElementById('bold');
const temp1 = document.getElementById('italic');
const temp2 = document.getElementById('strikethrough');
const temp3 = document.getElementById('link');
const temp4 = document.getElementById('add');


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


const name1 = prompt("Enter your name to join");

socket.emit('new-user-joined', name1);

socket.on('user-joined', name1 => {
    append(`${name1} joined the chat`, `right`);
})


socket.on('receive', data => {
    append(`${data.name}:${data.message}`, `left`);
})

socket.on('left', name => {
    append(`${name} left the chat`, `right`);
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});


temp.addEventListener('click', function myfunc() {
    messageInput.style.fontWeight = "bold";
});
temp1.addEventListener('click', function myfunc() {
    messageInput.style.fontStyle = "italic";
});
temp2.addEventListener('click', function myfunc() {
    messageInput.style.textDecoration = "line-through";
});

temp3.addEventListener('click', function myfunc() {
    
});


temp4.addEventListener('click', function () {
    var node = document.createElement("li");
    var text = document.getElementById("messageInp").value;
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("messageInp").appendChild(node);
})

