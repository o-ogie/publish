import request from "/js/lib/request.js";

const preview = document.querySelector("#preview > #text");
const preimg = document.querySelector("#preview > #img");
const insert = document.querySelector("#insert");
const insertBtn = document.querySelector("#insertBtn");
const imgform = document.querySelector("#imgform");
const imgfile = document.querySelector("#imgfile");
const inputimg = document.querySelector("#inputimg");

let subject = "";
let content = "";
let img = "";
const back = document.querySelector("#back");

const frm = document.querySelector("#frm");

const inserthandler = (e) => {
    const value = e.target.value;
    if (e.target.name === "subject") {
        subject = value;
    } else if (e.target.name === "content") {
        content = value;
    }
    preview.innerHTML = `<h2>${subject}</h2>
    <textarea class="pre" disabled>${content}</textarea>
    `;
};

const hash = document.querySelector("#hashtag");
const hashs = document.querySelector("#hash");

const hashhandler = (e) => {
    if (e.key === "Enter") {
        let hashtags = document.createElement("p");
        hashtags.className = "hashtags";
        const dele = document.querySelectorAll("#hash > p");
        for (let i = 0; i < dele.length; i++) {
            if (dele[i].innerHTML === `#${e.target.value}`) e.target.value = "";
        }
        if (!e.target.value) return;
        hashtags.innerHTML = `#${e.target.value}`;
        hashs.append(hashtags);
        e.target.value = "";
        const destroy = document.querySelectorAll("#hash > p");
        destroy[destroy.length - 1].addEventListener("click", (e) => {
            e.target.remove();
        });
    }
};

frm.addEventListener("submit", (e) => {
    e.preventDefault();
});

const submithandler = async (e) => {
    e.preventDefault();
    const hashs = [];
    const hashtags = document.querySelectorAll("#hash > p");
    for (let i = 0; i < hashtags.length; i++) {
        hashs.push(hashtags[i].innerHTML);
    }
    hash.value = hashs;

    // toast ui
    const contentDiv = document.querySelector(".ProseMirror");
    const contentValue = contentDiv.innerHTML;
    frm.content.value = contentValue;

    try {
        if (frm.subject.value === "" || frm.content.value === "") {
            throw new Error("제목과 내용을 채워주세요");
        }
    } catch (e) {
        alert(e);
        e.preventDefault();
    }

    frm.submit();
};

document.querySelector("#inputimg").style.display = "none";
document.querySelector("#imgfile > input").addEventListener("change", (e) => {
    e.preventDefault();
    document.querySelector("#inputimg").click();
});

const imghandler = async (e) => {
    const body = new FormData(frm);
    const respone = await request.post("/boards/array", body, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    const imgarray = respone.data;
    for (let i = 0; i < imgarray.length; i++) {
        const img = document.createElement("img");
        img.className = "previewimg";
        img.src = `http://localhost:3000/board/${imgarray[i]}`;
        preimg.append(img);

        const contentDiv = document.querySelector(".ProseMirror");
        contentDiv.innerHTML += `${"&lt"}img src=${img.src}>`;
    }
};

inputimg.addEventListener("click", imghandler);
// const testhandler = async (e) => {
//     e.preventDefault();
// };

// imgform.addEventListener("submit", testhandler);

hash.addEventListener("keypress", hashhandler);
insert.addEventListener("input", inserthandler);
insertBtn.addEventListener("click", submithandler);

