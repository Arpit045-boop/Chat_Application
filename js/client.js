const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const temp = document.getElementById('bold');
const temp1 = document.getElementById('italic');
const temp2 = document.getElementById('strikethrough');
const temp3 = document.getElementById('link');
const temp4 = document.getElementById('add');

var flag_bold = 0;
var flag_italic = 0;
var flag_strikethrough = 0;
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    if (flag_bold == 1) {
        messageElement.style.fontWeight = "bold";
        flag_bold = 0;
    }
    if (flag_italic == 1) {
        messageElement.style.fontStyle = "italic";
        flag_italic = 0;
    }
    if (flag_strikethrough == 1) {
        messageElement.style.textDecoration = "line-through";
        flag_strikethrough = 0;
    }

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
    messageInput.style.fontStyle = "normal";
    messageInput.style.fontWeight = "normal";
    messageInput.style.textDecoration = "none";
});


temp.addEventListener('click', function myfunc() {
    if (flag_bold == 1) {
        messageInput.style.fontWeight = "normal";
        flag_bold = 0;
    }
    else {
        messageInput.style.fontWeight = "bold";
        flag_bold = 1;
    }

});
temp1.addEventListener('click', function myfunc() {
    if (flag_italic == 1) {
        messageInput.style.fontStyle = "normal";
        flag_italic = 0;
    } else {
        messageInput.style.fontStyle = "italic";
        flag_italic = 1;
    }
});
temp2.addEventListener('click', function myfunc() {
    if (flag_strikethrough == 1) {
        messageInput.style.textDecoration = "none";
        flag_strikethrough = 0;
    } else {
        messageInput.style.textDecoration = "line-through";
        flag_strikethrough = 1;
    }
});




