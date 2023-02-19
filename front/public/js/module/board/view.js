import request from "/js/lib/request.js";
import Comment from "/js/core/comment.js";

new Comment(document.querySelector("#comments"), request);

const hashs = document.querySelector("#hashs");
const img = document.querySelector(".img");
const heart = document.querySelector(".img > iconify-icon");
const nowme = document.querySelector("#nowme");
const likecount = document.querySelector("#likes > p");
const likelist = document.querySelector(".likewho");
const boarddel = document.querySelector(".delete");
// const commetadd = document.querySelectorAll("#addComment");
// const commentbtn = document.querySelectorAll("#btns");
// const commentfrm = document.querySelector("#commentfrm");

const createhash = (strhash) => {
    if (strhash.innerHTML === "") return;
    const hash = strhash.innerHTML.split(",");
    const values = hash.map((v) => `<p class="hashtags">${v}</p>`).join(" ");
    strhash.innerHTML = values;
};
createhash(hashs);

// const payload = () => {
//     const cookie = document.cookie.split(";");
//     const token = cookie
//         .reduce((acc, val, idx) => {
//             let [key, values] = val.split("=");
//             acc[key] = values;
//             return acc;
//         }, {})
//         .token.split(".")[1];

//     return token;
// };

// const myprofile = async () => {
//     let token = payload();
//     const body = { payload: token };

//     const respone = await request.post(`boards/decode`, body);
//     return respone.data;
// };

// myprofile();

const likeHandler = async () => {
    const userid = nowme.value;
    const path = document.location.pathname;
    const [emptyval, board, id, idx] = path.split("/");
    const body = { userid };
    const respone = await request.post(`/boards/${id}/${idx}/likes`, body);
    likecount.innerHTML = respone.data.count;
    likecheck(respone.data.check);
};

const likecheck = (check) => {
    if (check === null || !check) {
        heart.className = "unlike";
    } else {
        heart.className = "like";
    }
};
const array = likelist.value.split(", ").filter((v) => v === nowme.value);
likecheck(array[0]);

// const likecheck = async ({ id, idx }) => {
//     const respone = await request.get(`/boards/${id}/${idx}/likes`);
//     console.log(respone.data);
// };

img.addEventListener("click", likeHandler);
// img.addEventListener("click", (e) => {
//     e.target.classList.add("big");
// });

// const commentHandler = async (e) => {
//     e.preventDefault();
//     try {
//         const boardWirterid = document.querySelector("#userid");

//         const parentid = commentfrm.parentid.value;
//         console.log(parentid);
//         const comment = commentfrm.comment.value;
//         const userid = nowme.value;
//         const body = {
//             userid,
//             parentid,
//             content: comment,
//             boardWirterid: boardWirterid.value,
//         };
//         const path = document.location.pathname;
//         const [emptyval, board, id, idx] = path.split("/");
//         if (comment === "") throw "내용이 없습니다.";
//         const respone = await request.post(`/boards/${idx}/comments`, body);
//         commentfrm.reset();
//         location.href = `/board/${id}/${idx}`;
//     } catch (error) {
//         alert(error);
//     }
// };

// commentfrm.addEventListener("submit", commentHandler);

// const addcommentHandler = (e) => {
//     const array = e.target.parentNode.parentNode.parentNode.children;
//     if (array["commentfrm"]) document.querySelector("#commentContent > form").remove();
//     else {
//         const clone = commentfrm.cloneNode(true);
//         const parent = e.target.parentNode.parentNode.parentNode;

//         const groupIndex = parent.dataset.index;
//         const pointUserid = parent.querySelector("#commentUser > a");
//         parent.append(clone);
//         clone.addEventListener("submit", async (e) => {
//             e.preventDefault();
//             const boardWirterid = document.querySelector("#userid");

//             const comment = clone.comment.value;
//             const userid = nowme.value;
//             const body = {
//                 userid,
//                 parentid: groupIndex,
//                 content: comment,
//                 pointUp: pointUserid.innerHTML,
//                 boardWirterid: boardWirterid.innerHTML,
//             };
//             const path = document.location.pathname;
//             const [emptyval, board, id, idx] = path.split("/");
//             const respone = await request.post(`/boards/${idx}/comments`, body);
//             location.href = `/board/${id}/${idx}`;
//         });
//     }
// };

// commetadd.forEach((v) => {
//     v.addEventListener("click", addcommentHandler);
// });

const deleteHandler = async (e) => {
    e.preventDefault();
    if (confirm("삭제하시겠습니까")) {
        if (confirm("정말로 삭제하시겠습니까")) {
            const path = document.location.pathname;
            const [emptyval, board, id, idx] = path.split("/");
            await request.delete(`/boards/${idx}`);
            location.href = `/`;
        } else {
            return;
        }
    } else {
        return;
    }
};

if (boarddel) {
    boarddel.addEventListener("click", deleteHandler);
}

// const commentDelete = async (e) => {
//     switch (e.target.id) {
//         case "deleteBtn":
//             const commentidx = e.target.parentNode.parentNode.dataset.index;
//             const path = document.location.pathname;
//             const [emptyval, board, id, idx] = path.split("/");
//             if (confirm("삭제하시겠습니까")) {
//                 if (confirm("정말로 삭제하시겠습니까")) {
//                     await request.delete(`/boards/${id}/comments/${commentidx}`);
//                     location.href = `/board/${id}/${idx}`;
//                 } else {
//                     return;
//                 }
//             }
//             break;
//         case "updateBtn":
//             const target = e.target.parentNode.parentNode;
//             const input = target.querySelector(".commentContent");
//             const span = document.createElement("span");
//             const btndiv = target.querySelector("#btns");
//             input.disabled = false;
//             input.focus();
//             span.id = "submitbtn";
//             span.innerHTML = "완료";
//             btndiv.append(span);
//             const update = target.querySelector("#updateBtn");
//             update.remove();
//             break;
//         case "submitbtn":
//             if (confirm("수정하시겠습니까")) {
//                 const commentidx = e.target.parentNode.parentNode.dataset.index;

//                 const target = e.target.parentNode.parentNode;
//                 const input = target.querySelector(".commentContent");
//                 const comment = input.value;
//                 const userid = nowme.value;
//                 const body = {
//                     userid,
//                     content: comment,
//                 };
//                 const path = document.location.pathname;
//                 const [emptyval, board, id, idx] = path.split("/");
//                 const respone = await request.put(`/boards/${id}/comments/${commentidx}`, body);
//                 location.href = `/board/${id}/${idx}`;
//             } else {
//                 return;
//             }

//             break;
//     }
// };

// for (let i = 0; i < commentbtn.length; i++) {
//     commentbtn[i].addEventListener("click", commentDelete);
// }

// const openRecomment = document.querySelectorAll("#openRecomment");
// openRecomment.forEach((v) => {
//     const children = document.querySelectorAll(".child input[value]");
//     const parentId = v.parentNode.querySelector("#parentId").value;

//     let count = 0;
//     for (const input of children) {
//         if (input.value.split("-")[0] === parentId) {
//             count++;
//         }
//     }
//     if (count === 0) v.style.display = "none";
//     v.innerHTML = `답글 열기(${count})`;

//     v.addEventListener("click", (e) => {
//         const box = e.target.parentNode;
//         const parentId = box.querySelector("#parentId").value;
//         v.classList.toggle("close");
//         if (v.className === "close") v.innerHTML = `답글 닫기`;
//         else v.innerHTML = `답글 열기(${count})`;

//         for (const input of children) {
//             if (input.value.split("-")[0] === parentId) {
//                 let child = input.parentNode;
//                 child.classList.toggle("open");
//             }
//         }
//     });
// });

const clipHandler = () => {
    let url = "";
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    document.querySelector("#clipMessage").classList.add("on");
    setTimeout(() => {
        document.querySelector("#clipMessage").classList.remove("on");
    }, 4000);
};

const clip = document.querySelector(".clip");
clip.addEventListener("click", clipHandler);

const sideComponent = document.querySelector("#sideComponent");
const likes = document.querySelector("#likes");
const comments = document.querySelector("#commentsWrap");

sideComponent.addEventListener("click", (e) => {
    const boardContent = document.querySelector("#boardcontent");
    const headline = boardContent.querySelectorAll(`${e.target.tagName}`);

    headline.forEach((v) => {
        if (v.innerText === e.target.innerText) {
            v.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const scrollHandler = () => {
    if (window.pageYOffset < comments.offsetTop - window.innerHeight * 0.3) {
        sideComponent.style.top = `${window.pageYOffset + window.innerHeight * 0.3}px`;
        likes.style.top = `${window.pageYOffset + window.innerHeight * 0.3}px`;
    }
};
window.addEventListener("scroll", scrollHandler);

