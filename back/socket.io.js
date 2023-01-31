const Socket = require('socket.io')

module.exports = (server,app)=>{
    const io = Socket(server, {path:'/socket.io'})


    io.on('connection',(socket)=>{
        const {remoteAddress} = socket
        console.log(socket)
        socket.on('message',(message)=>{
            console.log('msg',message)
            socket.broadcast.emit('reply',message)
        })
    })
}