// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch")

sortSwitch.value = location.search.indexOf('sort') === -1 ? 'A.id' : location.search.split("=")[1]
categorySwitch.value = location.search.indexOf('category') === -1 ? 'default' : location.search.split("=")[1]


// if (location.search.indexOf("sort")) sort = location.search.split("=")[1];
// if (location.search.indexOf("category")) category = location.search.split("=")[1];

// for (const option of sortSwitch.options) {
//     if (sort === option.value) {
//         document.addEventListener("DOMContentLoaded", () => {
//             sortSwitch.value = sort;
//         });
//     }
// }

