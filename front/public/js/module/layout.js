import particle from "/js/lib/particle.js";



document.querySelector("#layout").addEventListener("mouseover", () => {
  document.querySelector("#layoutWrap").classList.add("scrolled");
  document.querySelector("#logo").style.filter = "invert(0%)";
  document.querySelector("#write>button>a").style.filter = "invert(100%)";
  document.querySelector('input[id="menu_icon"] + label').style.filter =
    "invert(100%)";
});
document.querySelector("#layout").addEventListener("mouseout", () => {
  document.querySelector("#layoutWrap").classList.remove("scrolled");
  document.querySelector("#logo").style.filter = "invert(100%)";
  document.querySelector("#write>button>a").style.filter = "invert(0%)";
  document.querySelector('input[id="menu_icon"] + label').style.filter =
    "invert(0%)";
});

const xBtn = document.querySelector('#menu_icon')
const userMenu = document.querySelector('#userMenu')
xBtn.addEventListener("click", (e) => {
  userMenu.classList.toggle("clicked");
});
document.addEventListener("click", (e) => {
  if (!e.target.closest('#userMenu') && userMenu.className === "clicked" && e.target !== xBtn) {
      // if (e.target !== userMenu && userMenu.className === "clicked" && e.target !== xBtn) {
    xBtn.click();
  }
});

// 로그아웃
document.querySelector("#logout").addEventListener("click", (e) => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  location.href = "/";
});




// 채팅
const chatBtn = document.querySelector('#chatToggle')
const chatterBox = document.querySelector('#chatterBox')
chatBtn.addEventListener("click", (e) => {
  chatterBox.classList.toggle("clicked");
});


const socket = io.connect('http://localhost:3000',{
  path:'/socket.io',
  transports:['websocket']
})

// User 명단 List 받기
socket.on('users',(data)=>{
  console.log(data)
  const toUser = document.querySelector('#toUser')
  const userList = document.querySelector('#participant')
  const userCount = document.querySelector('#userCount')
  userList.innerHTML = ''

  // 채팅 참여자 명단, 대화 대상 select 생성
  data.participant.forEach((nickname)=>{
      const user = document.createElement('p')
      const to = document.createElement('option')
      user.innerHTML = nickname
      userList.append(user)
  
      if ( nickname !== data.nickname ){
          to.value = `${nickname}`
          to.text = nickname
          toUser.append(to)
      }
      
  })
  userCount.innerHTML = data.participant.length

})

socket.on('hello',(data)=>{
  console.log(data)
})

/* 채팅 대답 */
socket.on('reply', (data)=>{
  const response = JSON.parse(data)
  console.log('response::::::',response)
  const li = document.createElement('li')
  li.className = 'otherMessage'

  const userImg = document.createElement('img')
  userImg.src = response.userImg
  userImg.alt = "User Image"
  li.append(userImg)
  
  const nickname = document.createElement('span')
  nickname.innerHTML = response.nickname
  li.append(nickname)
  
  const message = document.createElement('p')
  message.innerHTML = response.message.message
  li.append(message)
  
  chat.append(li)
})

// 단체방 귓속말
socket.on('privateMessage',(data)=>{
  const response = JSON.parse(data)
  const li = document.createElement('li')
  li.innerHTML = "귓속말:"+response.message
  chat.append(li)
})


// 채팅 보내기
const chatFrm = document.querySelector('#chatFrm')
chatFrm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const {toUser, message} = e.target
  if(toUser.value === 'default') socket.emit('message', {message:message.value})
  else socket.emit('private', {toUser:toUser.value, message:message.value})
  const li = document.createElement('li')
  if (toUser.value === 'default') {
     li.className = 'myMessage'
     li.innerHTML = message.value 
    }
  else { 
     li.className = 'privateMessage'
     li.innerHTML = `${toUser.value}에게. `+ message.value
    }
  chat.append(li)
  

  chatFrm.reset()
})







