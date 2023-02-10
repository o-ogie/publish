import request from "/js/lib/request.js";

// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch")

sortSwitch.value = location.search.indexOf('sort') === -1 ? 'A.id' : location.search.split("=")[1]
categorySwitch.value = location.search.indexOf('category') === -1 ? 'default' : location.search.split("=")[1]




// 글 감추기
const blindBtn = document.querySelector('.hideItem')
const itemId = document.querySelectorAll('#itemId')

// blindBtn.addEventListener('click', async (e) => {
//     console.log(e.target.parentNode.parentNode)
//     // const response = await request.post(`/boards/${itemId}/blind`, {
//     //     userid: userid.value,
//     //   });
// })