let socket = io();
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('log');
let user;
/* ALERT DE IDENTIFICACIÓN */
Swal.fire({
    title: "Decinos tu nombre",
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "Necesitás indicar tu nombre para participar en el chat."
    }
}).then(result => {
    user = result.value;
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatBox.value.trim() });
            chatBox.value=""
        }
    }
})

/* SOCKETS */
socket.on('log', data => {
    let messages = "";
    data.forEach(log => {
        messages = messages + `${log.user} dice: ${log.message} <br>`
    });
    log.innerHTML = messages;
})