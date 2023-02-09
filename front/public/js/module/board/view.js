import request from "/js/lib/request.js";

const hashs = document.querySelector("#hashs");
const img = document.querySelector(".img");
const heart = document.querySelector(".img > iconify-icon");
const nowme = document.querySelector("#nowme");
const likecount = document.querySelector("#likes > p");
const likelist = document.querySelector(".likewho");
const commentfrm = document.querySelector("#commentfrm");
const boarddel = document.querySelector(".delete");

const createhash = (strhash) => {
    if (strhash.innerHTML === "") return;
    const hash = strhash.innerHTML.split(",");
    const values = hash.map((v) => `<p class="hashtags">${v}</p>`).join(" ");
    strhash.innerHTML = values;
};

const payload = () => {
    const cookie = document.cookie.split(";");
    const token = cookie
        .reduce((acc, val, idx) => {
            let [key, values] = val.split("=");
            acc[key] = values;
            return acc;
        }, {})
        .token.split(".")[1];

    return token;
};

createhash(hashs);

const myprofile = async () => {
    let token = payload();
    const body = { payload: token };

    const respone = await request.post(`boards/decode`, body);
    return respone.data;
};

myprofile();

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

const commentHandler = async (e) => {
    e.preventDefault();
    try {
        const group = commentfrm.group.value;
        const comment = commentfrm.comment.value;
        const userid = nowme.value;
        const body = {
            userid,
            group,
            content: comment,
        };
        const path = document.location.pathname;
        const [emptyval, board, id, idx] = path.split("/");
        if (comment === "") throw "내용이 없습니다.";
        const respone = await request.post(`/boards/${idx}/comments`, body);
        commentfrm.reset();
        location.href = `/board/${id}/${idx}`;
    } catch (error) {
        alert(error);
    }
};

commentfrm.addEventListener("submit", commentHandler);

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

boarddel.addEventListener("click", deleteHandler);

