const Socket = require('socket.io')

module.exports = (server,app)=>{
    const io = Socket(server, {path:'/socket.io'})
    const users = {}
    participant = []

    /** Client 접속 이벤트 */
    io.on('connection',(socket)=>{
        const payload = socket.handshake.headers.cookie.split("=")[1].split('.')[1]
        const {userImg, nickname} = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));

        users[socket.id]={userImg,nickname}
        participant.push(nickname)
        socket.nickname = nickname
        console.log('socket:::::',socket.nickname)

        socket.emit('users',{participant,nickname})
        /**Client 접속시 현재 접속자들에게 누가 들어왔는지 알려줌. */
        socket.emit('hello',`${nickname}님이 입장하셨습니다.`)


        /**한 Client가 메세지를 날렸을시 모든 사용자에게 메세지를 전달해줌.
         * or 같은 Room의 사용자 ( 이건 되는지 모름. 추후에 Room 구현하고 코드 수정 )
         */
        socket.on('message',(message)=>{
            console.log('on::::::',users[socket.id])
            const {userImg, nickname} = users[socket.id]
            const obj = {userImg, nickname, message}
            socket.broadcast.emit('reply',JSON.stringify(obj))
        })

        /**Client가 대화방을 나가면 남은 Client들에게 누가 나갔는지 알려줌. */
        socket.on('disconnect',()=>{
            console.log(`${users[socket.id].nickname}님이 연결 끊었습니다.`)
            socket.broadcast.emit('bye',`${users[socket.id].nickname}님이 연결 끊었습니다.`)
            delete users[socket.id]
            participant = participant.filter(v=>v!==socket.nickname)
        })


    })


}
