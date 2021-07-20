//now we want to add the messages we sent in the chat
const chatForm = document.getElementById('chat-form');


const socket = io();

//message from server
socket.on('message', message => {
    console.log(message);

    outputMessage(message);
});

//message submit, we are creating an event listener for submission of that form
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //now we need to get the text input
    const msg= e.target.elements.msg.value;
    //we have a id="msg" in the chat.html

    //emit message to server
     socket.emit('chatMessage', msg);
});

//output message to DOM(DOM manipulation)
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Ritu <span>9:12 pm</span></p>
    <p class="text">
       ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
