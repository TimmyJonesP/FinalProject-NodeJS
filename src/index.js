const { Server } = require("socket.io")
const app = require("./app")
const { port } = require("./config/app.config")

const httpServer = app.listen(port, () => {
    console.log(`server running at port ${port}`)
})

const io = new Server(httpServer)

io.on('connection', socket => {
    console.log(`Client connected with id: ${socket.id}`)
    io.emit('mensajeServidor', 'Hola desde el servidor!!!')
    socket.on('busca', query => {
        io.emit('actualizar', query);
    });
});