const app = require('./app')
const SocketIO = require('./socket.io')

const server = app.listen(3000,()=>{
    console.log('BE SERVER START')
})

SocketIO(server,app)