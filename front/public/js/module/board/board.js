const preview = document.querySelector("#preview");
const insert = document.querySelector("#insert");
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
const hashs = document.querySelector("#hashs");
console.log(hashs);

const hashhandler = (e) => {
    if (e.key === "Enter") {
        let hashtags = document.createElement("p");
        hashtags.className = "hashtags";
        if (!e.target.value) return;
        hashtags.innerHTML = `#${e.target.value}`;
        hashs.append(hashtags);
        e.target.value = "";
    }
};

frm.addEventListener("submit", (e) => {
    e.preventDefault();
});

hash.addEventListener("keydown", hashhandler);

insert.addEventListener("input", inserthandler);

