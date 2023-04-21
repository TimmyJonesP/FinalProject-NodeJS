const socket = io()

socket.on('mensajeServidor', message => {
    console.log(message)
  })