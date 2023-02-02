const hashs = document.querySelector("#hashs");

const createhash = (strhash) => {
    if (strhash.innerHTML === "") return;
    const hash = strhash.innerHTML.split(",");
    const values = hash.map((v) => `<p class="hashtags">${v}</p>`).join(" ");
    strhash.innerHTML = values;
};
const test = (v) => {
    let tag = document.createElement("p");
    tag.className = "hashtags";
    tag.innerHTML = v;
    hashs.append(tag);
};

createhash(hashs);

