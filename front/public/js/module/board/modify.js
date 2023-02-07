const update = document.querySelector("#updateBtn");
const frm = document.querySelector("#frm");
const contentText = document.querySelector(".contentText");
console.log(contentText);

const updateHandler = (e) => {
    e.preventDefault();

    if (frm.subject.value === "" || frm.content.value === "") {
        alert("내용을 입력해주세요");
    } else {
        frm.submit();
    }
};

update.addEventListener("click", updateHandler);

