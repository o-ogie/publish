import request from "/js/lib/request.js";

const frm = document.querySelector("#loginFrm");
const remember = document.querySelector("#rememberMe");
let date = new Date();
date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

window.addEventListener("load", () => {
  if (localStorage.getItem("userid")) {
    remember.checked = true;
    document.querySelector("#userid").value = localStorage.getItem("userid");
    document.querySelector("#userpw").value = localStorage.getItem("userpw");
  }
});

frm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const { userid, userpw } = e.target;
    if (remember.checked) {
      localStorage.setItem("userid", userid.value);
      localStorage.setItem("userpw", userpw.value);
    } else {
      localStorage.removeItem("userid");
      localStorage.removeItem("userpw");
    }

    const response = await request.post("/auths", {
      userid: userid.value,
      userpw: userpw.value,
    });

    console.log(response.data);
    const status = response.data.status;
    if (status >= 400) throw new Error(e);
    else if (response.status >= 200) {
      document.cookie = `token=${
        response.data.token
      }; path=/; expires=${date.toUTCString()};`;
    }
    location.href = "/";
  } catch (e) {
    alert(`아이디와 패스워드가 일치하지 않습니다`);
  }
});

// find id & pw
const popupBtn = document.querySelector(".findUserBtn");
const findUser = document.querySelector("#findUser");
const tabSwitch = document.querySelectorAll(".switchType li");
const findId = document.querySelector("#findIdFrm");
const findPw = document.querySelector("#findPwFrm");

popupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  findUser.classList.add("switchOn");
});
document.addEventListener("mouseup", (e) => {
  if (!e.target.closest("#findUser")) {
    findUser.classList.remove("switchOn");
  }
});
tabSwitch.forEach((li, index) => {
  li.addEventListener("click", async () => {
    li.classList.add("switchOn");
    if (index === 0) {
      tabSwitch[1].classList.remove("switchOn");
      findId.classList.add("switchOn");
      findPw.classList.remove("switchOn");
    } else {
      tabSwitch[0].classList.remove("switchOn");
      findPw.classList.add("switchOn");
      findId.classList.remove("switchOn");
    }
  });
});


findId.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { username, email } = e.target;
  console.log(username.value, email.value);
  const response = await request.post("/users/usercheck", {
    email: email.value,
  });
  document.querySelector(".result span").innerHTML = response.data.userid;
  document.querySelector(".result").style.opacity = 1;
});
findPw.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const { userid, email } = e.target;
    console.log(userid.value, email.value);
    const response = await request.post("/users/usercheck", {
      userid: userid.value,
    });
    const tempPw = await request.post("/auths/mail", {
      data: {
        userid: response.data.userid,
        email: response.data.email,
      },
    });
    console.log(tempPw.data);
    document.querySelectorAll(".result")[1].style.opacity = 1;
  } catch (e) {}
});

// CSS
document.querySelectorAll(".inputContainer input").forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focused");
  });
  input.addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focused");
  });
});
