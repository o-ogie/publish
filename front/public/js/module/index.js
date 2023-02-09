// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
let sort = "id";
if (location.search.indexOf("sort")) sort = location.search.split("=")[1];

for (const option of sortSwitch.options) {
    if (sort === option.value) {
        document.addEventListener("DOMContentLoaded", () => {
            sortSwitch.value = sort;
        });
    }
}

