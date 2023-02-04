import request from "/js/lib/request.js";

const checkInput = async (inputId, reg, callback) => {
  document
    .querySelector(`#${inputId}Box`)
    .addEventListener("keyup", async () => {
      let error = document.querySelector(`#${inputId}Box .alertMessage`);
      let input = document.querySelector(`#${inputId}`);
      if (!reg.test(input.value)) {
        error.style.opacity = 1;
        error.style.transition = "opacity 0.2s ease-in-out";
      } else {
        error.style.opacity = 0;
        error.style.transition = "opacity 0.2s ease-in-out";
        callback(inputId);
      }
    });
};

// 중복 체크
const duplicateCheck = async (inputId) => {
  const check = document.querySelector(`#${inputId}Box .alertMessage`);
  const input = document.querySelector(`#${inputId}`);
  const response = await request.post("/users/usercheck", {
    [inputId]: input.value,
  });
  console.log(response.data);
  if (response.data !== null) {
    check.innerHTML = "이미 사용중입니다";
    check.style.color = "red";
  } else {
    check.innerHTML = "사용할 수 있습니다";
    check.style.color = "green";
  }
  check.style.opacity = 1;
};

const config = {
  userid: {
    reg: /^[A-Za-z0-9]{6,16}$/,
    callback: duplicateCheck,
  },
  username: {
    reg: /^[A-Za-z가-힣]{3,16}$/,
    // callback: null,
  },
  nickname: {
    reg: /^[A-Za-z가-힣0-9]{2,16}$/,
    callback: duplicateCheck,
  },
  userpw: {
    reg: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
    // callback: null,
  },
  phoneNumber: {
    reg: /^010[0-9]{8}$/,
    callback: duplicateCheck,
  },
  email: {
    reg: /^[A-Za-z0-9]+@[A-Za-z0-9.-_]{1,10}.[A-Za-z]{2,4}$/,
    callback: duplicateCheck,
  },
};

for (const key in config) {
  checkInput(key, config[key].reg, config[key].callback);
}

// 패스워드 재확인
document.querySelector("#pwcheck").addEventListener("keyup", () => {
  if (
    document.querySelector("#userpw").value !==
    document.querySelector("#pwcheck").value
  )
    document.querySelector(".checkMessage").style.opacity = 1;
  else {
    document.querySelector(".checkMessage").innerHTML = "비밀번호가 일치합니다";
    document.querySelector(".checkMessage").style.color = "green";
  }
});

// 아바타 등록
document.querySelector("#fileChoice").addEventListener("change", e => {
  e.preventDefault();
  document.querySelector('#photoFrm button').click();
});
document.querySelector("#photoFrm").addEventListener("submit", async e => {
  e.preventDefault();
  console.log(e.target)
  const body = new FormData(e.target);
  const response = await request.post("/users/single", body, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  const inputImg = document.querySelector("#inputImg");
  const previewImg = document.querySelector("#previewImg");
  inputImg.value = response.data.filename;
  previewImg.src = `http://127.0.0.1:3000/${response.data.filename}`;
  console.log(previewImg.src);
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


let checkbox = document.querySelector("#agree");
let agreeFrm = document.querySelector("#agreeFrm");
const checkHandler = () => {
  if (checkbox.checked) {
    agreeFrm.classList.add("hide");
    setTimeout(() => {
      agreeFrm.style.zIndex = "-1";
    }, 3000);
  }
};
checkbox.addEventListener("change", checkHandler);
