const socket = io()

socket.on('mensajeServidor', message => {
    console.log(message)
})

const searchInput = document.getElementById("search-navbar")

searchInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const query = searchInput.value;
        socket.emit('busca', query);
    }
});

socket.on('actualizar', query => {
    location.href = `?query=${query}`;
});