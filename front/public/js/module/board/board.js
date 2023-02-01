import request from "/js/lib/request.js";

const preview = document.querySelector("#preview");
const insert = document.querySelector("#insert");
const insertBtn = document.querySelector("#insertBtn");
const imgfile = document.querySelector("#imgfile");
const imgform = document.querySelector("#imgform");

let subject = "";
let content = "";
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
    <textarea class="pre" disabled>${content}</textarea>`;
};

const hash = document.querySelector("#hashtag");
const hashs = document.querySelector("#hash");

console.log(hash.value);
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
    // hash.value = hashs;
    frm.submit();
};
const testhandler = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const body = new FormData(e.target);

    const respone = await request.post("/boards/array", body, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    console.log(respone);
};

imgform.addEventListener("submit", testhandler);

hash.addEventListener("keydown", hashhandler);
insert.addEventListener("input", inserthandler);
insertBtn.addEventListener("click", submithandler);

