const update = document.querySelector("#updateBtn");
const frm = document.querySelector("#frm");
const mirror = document.querySelector(".ProseMirror");
const hash = document.querySelector("#hash");

const createhash = (strhash) => {
    if (strhash.innerHTML === "") return;
    const hash = strhash.innerHTML.split(",");
    const values = hash.map((v) => `<p class="hashtags">${v}</p>`).join(" ");
    strhash.innerHTML = values;
    const hashs = [...document.querySelectorAll(".hashtags")];
    hashs.forEach((v) =>
        v.addEventListener("click", (e) => {
            e.target.remove();
        })
    );
};

createhash(hash);

const updateHandler = (e) => {
    e.preventDefault();
    const contentValue = mirror.innerHTML;
    frm.content.value = contentValue;
    const hashs = [];
    const hashtags = document.querySelectorAll("#hash > p");
    for (let i = 0; i < hashtags.length; i++) {
        hashs.push(hashtags[i].innerHTML);
    }
    hash.value = hashs;
    if (frm.subject.value === "") {
        alert("내용을 입력해주세요");
    } else {
        console.log("됨");
        frm.submit();
    }
};

update.addEventListener("click", updateHandler);

