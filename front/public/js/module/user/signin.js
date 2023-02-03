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

    console.log(response.data)
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


// // KAKAO
// const kakao = document.querySelector("#kakaoLogin")
// kakao.addEventListener("click", async () => {
//   const response = await request.get("/oauth/kakao")
//   console.log(response)
//   document.cookie = `token="${response};`
// })



// find id & pw
const findUserBtn = document.querySelector('.findUserBtn')
const findUser = document.querySelector("#findUser")
const findId = document.querySelector("#findIdFrm");
const findPw = document.querySelector("#findPwFrm");
const tabSwitch = document.querySelectorAll(".switchType li")

findUserBtn.addEventListener("click", ()=> {
  findUser.classList.toggle("switchOn")
})
// document.addEventListener("click", (e) => {
//   if(!e.target.closest('#findUser')) {
//     findUser.classList.remove("switchOn")
//     console.log(2)
//   }
// })


tabSwitch.forEach((li)=> {
  li.addEventListener("click", async () => {
    li.style.backgroundColor = "#ececec";
    findId.classList.add("switchOff")
    findPw.classList.remove("switchOff")
  })
})
findId.addEventListener("submit", async (e) => {
  e.preventDefault()
  const { username, email } = e.target;
  console.log(username.value, email.value)
  const response = await request.post("/users/usercheck", {
      email: email.value,
  });
  document.querySelector(".result span").innerHTML = response.data.userid
  document.querySelector(".result").style.opacity = 1
})
findPw.addEventListener("submit", async (e) => {
  try {
    e.preventDefault()
    const { userid, email } = e.target;
    console.log(userid.value, email.value)
    const response = await request.post("/users/usercheck", {
      userid: userid.value,
    });
    const tempPw = await request.post("/auths/mail", {
      data : {
        userid: response.data.userid,
        email: response.data.email,
      }
    });
    console.log(tempPw.data)
    document.querySelectorAll(".result")[1].style.opacity = 1
  } catch (e) {
  }
})





// CSS
document.querySelectorAll(".inputContainer input").forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focused");
  });
  input.addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focused");
  });
});
