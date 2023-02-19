import particle from "/js/lib/particle.js";
// import chat from "/js/lib/chat.js";

document.querySelector("#layout").addEventListener("mouseover", () => {
    document.querySelector("#layoutWrap").classList.add("scrolled");
    document.querySelector("#logo").style.filter = "invert(0%)";
    document.querySelector("#write>button>a").style.filter = "invert(100%)";
    document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(100%)";
});
document.querySelector("#layout").addEventListener("mouseout", () => {
    document.querySelector("#layoutWrap").classList.remove("scrolled");
    document.querySelector("#logo").style.filter = "invert(100%)";
    document.querySelector("#write>button>a").style.filter = "invert(0%)";
    document.querySelector('input[id="menu_icon"] + label').style.filter = "invert(0%)";
});

const xBtn = document.querySelector("#menu_icon");
const userMenu = document.querySelector("#userMenu");
xBtn.addEventListener("click", (e) => {
    userMenu.classList.toggle("clicked");
});
document.addEventListener("click", (e) => {
    if (!e.target.closest("#userMenu") && userMenu.className === "clicked" && e.target !== xBtn) {
        // if (e.target !== userMenu && userMenu.className === "clicked" && e.target !== xBtn) {
        xBtn.click();
    }
});

// 로그아웃
document.querySelector("#logout").addEventListener("click", (e) => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    location.href = "/";
});

// chat

const chatBtn = document.querySelector("#chatToggle");
const chatAlert = document.querySelector(".messageAlert");
const chatterBox = document.querySelector("#chatterBox");
chatBtn.addEventListener("click", (e) => {
    chatterBox.classList.toggle("clicked");
    if (chatterBox.classList.contains("clicked")) chatAlert.style.display = "none";
});

const socket = io.connect("http://54.180.142.99:80", {
    path: "/socket.io",
    transports: ["websocket"],
});

// User 명단 List 받기
let user;
socket.on("users", (data) => {
    if (JSON.stringify(user) === JSON.stringify(data.participant)) return;
    const toUser = document.querySelector("#toUser");
    const userList = document.querySelector("#participant");
    const userCount = document.querySelector("#userCount");
    userList.innerHTML = "";

    // 채팅 참여자 명단, 대화 대상 select 생성
    user = data.participant;
    data.participant.forEach((nickname) => {
        const user = document.createElement("p");
        const to = document.createElement("option");
        toUser.options.length = 1;
        user.innerHTML = nickname;
        userList.append(user);

        if (nickname !== data.nickname) {
            to.value = `${nickname}`;
            to.text = nickname;
            toUser.append(to);
        }
    });
    userCount.innerHTML = data.participant.length;
});

socket.on("hello", (data) => {
    console.log(data);
});

/* 채팅 대답 */
socket.on("reply", (data) => {
    console.log("response::::::", data);
    const li = document.createElement("li");
    li.className = "otherMessage";

    const userDiv = document.createElement("div");
    userDiv.className = "userDiv";
    const nickname = document.createElement("span");
    nickname.innerHTML = data.nickname;
    userDiv.append(nickname);

    const userImg = document.createElement("img");
    userImg.src = data.userImg;
    userImg.alt = "User Image";
    userDiv.append(userImg);

    li.append(userDiv);

    const msgDiv = document.createElement("div");
    msgDiv.className = "msgDiv";
    const msgBalloon = document.createElement("div");
    msgBalloon.className = "messageBox";
    msgBalloon.innerHTML = data.message.message;
    msgDiv.append(msgBalloon);

    const timeSpan = document.createElement("span");
    timeSpan.className = "timeAt";
    timeSpan.innerHTML = data.time;
    msgDiv.append(timeSpan);

    li.append(msgDiv);

    chat.append(li);
    chatAlert.style.display = "block";
    if (chatterBox.classList.contains("clicked")) chatAlert.style.display = "none";
});

// 단체방 귓속말
socket.on("privateMessage", (data) => {
    console.log(data);
    console.log("response::::::", data);
    const li = document.createElement("li");
    li.className = "otherMessage";

    const userDiv = document.createElement("div");
    userDiv.className = "userDiv";
    const nickname = document.createElement("span");
    nickname.innerHTML = "From:" + data.nickname;
    userDiv.append(nickname);

    const userImg = document.createElement("img");
    userImg.src = data.userImg;
    userImg.alt = "User Image";
    userDiv.append(userImg);

    li.append(userDiv);

    const msgDiv = document.createElement("div");
    msgDiv.className = "msgDiv";
    const msgBalloon = document.createElement("div");
    msgBalloon.className = "messageBox";
    msgBalloon.innerHTML = data.message;
    msgDiv.append(msgBalloon);

    const timeSpan = document.createElement("span");
    timeSpan.className = "timeAt";
    timeSpan.innerHTML = data.time;
    msgDiv.append(timeSpan);

    li.append(msgDiv);

    chat.append(li);
    chatAlert.style.display = "block";
    if (chatterBox.classList.contains("clicked")) chatAlert.style.display = "none";
});

// 채팅 보내기
const chatFrm = document.querySelector("#chatFrm");
chatFrm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = new Date();
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    const time = date.toLocaleTimeString([], options);

    const { toUser, message } = e.target;
    console.log("toUser.value::::", message.value);
    if (toUser.value === "default") socket.emit("message", { message: message.value });
    else socket.emit("private", { toUser: toUser.value, message: message.value });
    const li = document.createElement("li");
    if (toUser.value === "default") {
        li.className = "myMessage";

        const msgDiv = document.createElement("div");
        const msgBalloon = document.createElement("div");
        msgBalloon.className = "messageBox";
        msgBalloon.innerHTML = message.value;
        msgDiv.append(msgBalloon);

        const timeSpan = document.createElement("span");
        timeSpan.className = "timeAt";
        timeSpan.innerHTML = time;
        msgDiv.append(timeSpan);

        li.append(msgDiv);
    } else {
        li.className = "myMessage";

        const userDiv = document.createElement("div");
        userDiv.className = "userDiv";
        const nickname = document.createElement("span");
        nickname.innerHTML = "To:" + toUser.value;
        userDiv.append(nickname);
        li.append(userDiv);

        const msgDiv = document.createElement("div");
        const msgBalloon = document.createElement("div");
        msgBalloon.className = "messageBox";
        msgBalloon.innerHTML = message.value;
        msgDiv.append(msgBalloon);

        const timeSpan = document.createElement("span");
        timeSpan.className = "timeAt";
        timeSpan.innerHTML = time;
        msgDiv.append(timeSpan);

        li.append(msgDiv);
    }
    chat.append(li);

    chatFrm.reset();
});

