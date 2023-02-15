import request from "/js/lib/request.js";

if (document.querySelector("#provider").value === 'kakao') {
    document.querySelector('#btnBox').style.display = 'none';
}

document.querySelector('#userDelete').addEventListener('click', (e) => {
    e.preventDefault()
    if (confirm("정말 탈퇴하시습니까?")) document.querySelector('#profileFrm').submit();
    }
)

document.querySelector("#point").addEventListener("click", ()=> {
    document.querySelector("#details").classList.toggle("on");
})




const like = document.querySelector('#total_Like')
const comment = document.querySelector('#total_Comment')
const view = document.querySelector('#total_View')

;(async()=>{
    const {data} = await request.get(`/boards/profile/${userid.value}`)
    
    like.innerHTML=data.likes
    comment.innerHTML=data.comment
    view.innerHTML=data.view

})()