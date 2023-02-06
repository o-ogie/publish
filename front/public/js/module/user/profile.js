if (document.querySelector("#provider").value === 'kakao') {
    document.querySelector('#btnBox').style.display = 'none';
}

document.querySelector('#userDelete').addEventListener('click', (e) => {
    e.preventDefault()
    if (confirm("정말 탈퇴하시습니까?")) document.querySelector('#profileFrm').submit();
    }
)