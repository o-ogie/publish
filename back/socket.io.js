const Socket = require('socket.io')

module.exports = (server,app)=>{
    const io = Socket(server, {path:'/socket.io'})
    const users = {}
    let participant = []

    /** Client 접속 이벤트 */
    io.on('connection',(socket)=>{

        const cookie = socket.handshake.headers.cookie
        if (!cookie) return
        const payload = cookie.split('=')[1].split('.')[1]
        const {userImg, nickname} = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));

        socket.nickname = nickname
        users[socket.nickname]={socket:socket.id,userImg,nickname}
        participant.push(nickname)
        socket.emit('users',{participant,nickname, users})


        /**Client 접속시 현재 접속자들에게 누가 들어왔는지 알려줌. */
        socket.broadcast.emit('hello',`${nickname}님이 입장하셨습니다.`)


        /**한 Client가 메세지를 날렸을시 모든 사용자에게 메세지를 전달해줌.
         * or 같은 Room의 사용자 ( 이건 되는지 모름. 추후에 Room 구현하고 코드 수정 )
         */
        socket.on('message',(message)=>{
            const {userImg, nickname} = users[socket.nickname]
            const date = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: false };
            const time = date.toLocaleTimeString([], options);
            const obj = {userImg, nickname, message, time}
            socket.broadcast.emit('reply',JSON.stringify(obj))
        })

        /**귓속말기능 (아직 미구현) */
        socket.on('private', (message)=>{
            const {userImg, nickname} = users[socket.nickname]
            const obj = {userImg, nickname, message}
            socket.socket(users[socket.nickname].socket).emit('privateMessage',JSON.stringify(obj))
            }
        )

        
        /**Client가 대화방을 나가면 남은 Client들에게 누가 나갔는지 알려줌. */
        socket.on('disconnect',()=>{
            console.log(`${socket.nickname}님이 연결 끊었습니다.`)
            socket.broadcast.emit('bye',`${socket.nickname}님이 연결 끊었습니다.`)
            delete users[socket.id]
            participant = participant.filter(v=>v!==socket.nickname)
        })


    })


}

/**
 * 현재 쿠키 세션이 끝나서 로그아웃이 되어있는 상태로 가만히 있으면 서버가 꺼져버린다.
 * try catch문으로 예외처리하거나 쿠키가 없다면 index page로 튕기도록
 * 조치를 취해야 할 듯
 * 
 * 추후에 chating html이나 구역을 정해서 구현을 하면 쿠키가 없을시 실행이 안되도록 하면
 * 알아서 해결될 오류.
 */