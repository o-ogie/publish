// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch")

sortSwitch.value = location.search.indexOf('sort') === -1 ? 'A.id' : location.search.split("=")[1]
categorySwitch.value = location.search.indexOf('category') === -1 ? 'default' : location.search.split("=")[1]
