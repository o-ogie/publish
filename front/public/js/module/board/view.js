import request from "/js/lib/request.js";

const hashs = document.querySelector("#hashs");
const img = document.querySelector(".img");
const heart = document.querySelector(".img > iconify-icon");
const nowme = document.querySelector("#nowme");
const likecount = document.querySelector("#likes > p");
const likelist = document.querySelector(".likewho");
const commentfrm = document.querySelector("#commentfrm");
const boarddel = document.querySelector(".delete");
const commetadd = document.querySelectorAll("#commentRecomment");
const commentbtn = document.querySelectorAll("#btns");

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
    console.log(respone.data.check);
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
console.log(likelist.value);
const array = likelist.value.split(", ").filter((v) => v === nowme.value);
likecheck(array[0]);
console.log(array[0]);

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
        const boardWirterid = document.querySelector("#userid");
        const parentid = commentfrm.parentid.value;
        const comment = commentfrm.comment.value;
        const userid = nowme.value;
        const body = {
            userid,
            parentid,
            content: comment,
            boardWirterid: boardWirterid.innerHTML,
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

const addcommentHandler = (e) => {
    const array = e.target.parentNode.parentNode.children;
    if (array["commentfrm"]) document.querySelector("#commentContent > form").remove();
    else {
        const clone = commentfrm.cloneNode(true);
        const parent = e.target.parentNode.parentNode;

        const groupIndex = parent.dataset.index;
        const pointUserid = parent.querySelector("#commentUser");
        parent.append(clone);
        clone.addEventListener("submit", async (e) => {
            e.preventDefault();
            const boardWirterid = document.querySelector("#userid");
            console.log(boardWirterid.innerHTML);

            const comment = clone.comment.value;
            const userid = nowme.value;
            const body = {
                userid,
                parentid: groupIndex,
                content: comment,
                pointUp: pointUserid.innerHTML,
                boardWirterid: boardWirterid.innerHTML,
            };
            const path = document.location.pathname;
            const [emptyval, board, id, idx] = path.split("/");
            const respone = await request.post(`/boards/${idx}/comments`, body);
            location.href = `/board/${id}/${idx}`;
        });
    }
};

commetadd.forEach((v) => {
    v.addEventListener("click", addcommentHandler);
});

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

const commentDelete = async (e) => {
    switch (e.target.id) {
        case "deleteBtn":
            const commentidx = e.target.parentNode.parentNode.dataset.index;
            const path = document.location.pathname;
            const [emptyval, board, id, idx] = path.split("/");
            if (confirm("삭제하시겠습니까")) {
                if (confirm("정말로 삭제하시겠습니까")) {
                    await request.delete(`/boards/${id}/comments/${commentidx}`);
                    location.href = `/board/${id}/${idx}`;
                } else {
                    return;
                }
            }
            break;
        case "updateBtn":
            const target = e.target.parentNode.parentNode;
            const input = target.querySelector("input");
            const span = document.createElement("span");
            const btndiv = target.querySelector("#btns");
            input.disabled = false;
            input.focus();
            span.id = "submitbtn";
            span.innerHTML = "완료";
            btndiv.append(span);
            const update = target.querySelector("#updateBtn");
            update.remove();
            break;
        case "submitbtn":
            if (confirm("수정하시겠습니까")) {
                const commentidx = e.target.parentNode.parentNode.dataset.index;

                const target = e.target.parentNode.parentNode;
                const input = target.querySelector("input");
                const comment = input.value;
                const userid = nowme.value;
                const body = {
                    userid,
                    content: comment,
                };
                const path = document.location.pathname;
                const [emptyval, board, id, idx] = path.split("/");
                const respone = await request.put(`/boards/${id}/comments/${commentidx}`, body);
                location.href = `/board/${id}/${idx}`;
            } else {
                return;
            }

            break;
    }
};

for (let i = 0; i < commentbtn.length; i++) {
    commentbtn[i].addEventListener("click", commentDelete);
}




const openRecomment = document.querySelectorAll('#openRecomment');
const child = document.querySelectorAll('#commentContent')

const openCommentHandler = (e) => {
    const box = e.target.parentNode
    const parentId = box.querySelector('#parentId');

                  
}

openRecomment.forEach((v) => {
    v.addEventListener("click", openCommentHandler);
}); 






// showTag.addEventListener("click", (e) => {
//     const target = e.target;
//     if (target.nodeName === "LI") {
//         const tagname = target.textContent.split(" ")[0];

//         const boardList = document.querySelectorAll('.boardItem');
//         boardList.forEach(item => {
//             item.style.display = 'none';
//             const tagList = item.querySelectorAll('.tagList li');
//             tagList.forEach(tag => {
//                 if (tag.textContent.trim() == tagname) item.style.display = 'block';
//             });
//         });
//     }
// })
