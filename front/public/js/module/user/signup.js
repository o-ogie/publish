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
  setTimeout(()=>{
  check.style.opacity = 0;
  }, 2000)
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
  const check = document.querySelector(".checkMessage")
  if (
    document.querySelector("#userpw").value !==
    document.querySelector("#pwcheck").value
    )
    check.style.opacity = 1;
  else {
    check.innerHTML = "비밀번호가 일치합니다";
    check.style.color = "green";
    setTimeout(()=>{
      check.style.opacity = 0;
      }, 2000)
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


/** 주소찾기 */
const findAddress = () => {
  new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            document.querySelector("#extraAddress").value = extraAddr;
        
        } else {
            document.querySelector("#extraAddress").value = '';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.querySelector('#postcode').value = data.zonecode;
        document.querySelector("#address").value = addr;

        console.log(data)
        // 커서를 상세주소 필드로 이동한다.
        document.querySelector("#detailAddress").focus();
    }
  }).open();
}

document.querySelector('#find').addEventListener('click',findAddress)