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

    const status = response.data.status;
    if (status >= 400) throw new Error(e);
    else if (response.status >= 200) {
      document.cookie = `token=${
        response.data.token
      }; path=/; expires=${date.toUTCString()};`;
      location.href = "/";
    }
  } catch (e) {
    alert(`아이디와 패스워드가 일치하지 않습니다`);
  }
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







