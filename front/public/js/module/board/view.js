import request from "/js/lib/request.js";

const hashs = document.querySelector("#hashs");
const img = document.querySelector("#img");

const createhash = (strhash) => {
    if (strhash.innerHTML === "") return;
    const hash = strhash.innerHTML.split(",");
    const values = hash.map((v) => `<p class="hashtags">${v}</p>`).join(" ");
    strhash.innerHTML = values;
};
// const createP = (v) => {
//     let tag = document.createElement("p");
//     tag.className = "hashtags";
//     tag.innerHTML = v;
//     hashs.append(tag);
// };

const path = document.location.pathname;

createhash(hashs);

const likeHandler = async () => {
    await request.post(`${path}/liked`);
};

img.addEventListener("click", likeHandler);

