// const hash = document.querySelector("#hash");

// const hashhandler = (e) => {
//     if (e.key === "Enter") {
//         let hashtags = document.createElement("div");
//         hashtags.innerHTML = e.target.value;
//         hash.append(hashtags);
//     }
// };

// hash.addEventListener("keydown", hashhandler);

const frm = document.querySelector("#frm");
console.dir(frm);

const frmhandler = (e) => {
    e.preventDefault();
    console.log(e.target[22].innerHTML);
};

frm.addEventListener("submit", frmhandler);

