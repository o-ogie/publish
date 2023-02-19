import Component from "/js/core/component.js";

class Qna extends Component {
    async setup() {
        const userid = document.querySelector("#userid").value;
        const userlevel = document.querySelector("#userlevel").value;
        const list = await this.request.get(`/forum/${userid}/${userlevel}`);
        const [notice, comment] = list.data;
        this.setstatus({ list: comment });
    }

    templete() {
        // if (!this.target.querySelector("#userid") && !this.target.querySelector("#userlevel")) return;

        const list = this.state?.list;
        if (list === undefined) return "로딩중";
        const parent = this.target.parentNode;
        const userid = parent.querySelector("#userid").value;
        const userlevel = parent.querySelector("#userlevel").value;
        let recomment = userlevel === "admin" ? `<button id="commentRecomment" class="commentBtn"><iconify-icon icon="mdi:comment-plus"></iconify-icon><span id="addAnswer">답글</span></button>` : " ";
        const data = `
            <form method="post" action="" id="commentfrm">
                <div id="commentFrmInput">
                <input type="text" name="comment" id="comment" placeholder="질문을 입력해주세요" />
                </div>
                <button id="qnaBtn" type="submit">질문 등록</button>
            </form>
            <div id="QnA">
                <ul>${list
                    .map((v) => {
                        let clas = v.depth > 0 ? 'class="child open"' : " ";
                        let btns =
                            userid === v.userid || userlevel === "admin"
                                ? `<button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon>수정</button>
                        <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>`
                                : " ";
                        let recommentbtn = v.depth > 0 ? " " : recomment;
                        return `
                <li id="commentContent" ${clas} data-index="${v.id}">
                    <input type="hidden" value="${v.parentid}" id="parentId" />

                    <div class="writeData">
                        <span id="userimg">
                            <img src="${v.userimg}" alt="" />
                        </span>
                        <div>
                            <span id="commentUser" class="writer">${v.userid}</span>
                            <span class="timeStamp" style="color: #999; font-size: 0.9em">
                            <span id="commentDate" class="innerText writer">${v.createdAt.slice(0, -5).split("T").join(".").split(":").join(".")}</span>
                            </span>
                        </div>
                    </div>
                    <input type="text" class="commentContent" value="${v.content}" disabled />
                    <div id="btns">
                    ${recommentbtn}
                    ${btns}
                    </div>  
                </li>`;
                    })
                    .join("")}
                </ul>
            </div>`;
        return data;
    }

    setEvent() {
        this.addEvent("click", "#commentRecomment", (e) => {});

        this.addEvent("submit", "#commentfrm", async (e) => {
            e.preventDefault();
            const content = e.target.querySelector("#comment").value;
            const parent = this.target.parentNode;
            const userid = parent.querySelector("#userid").value;
            const body = { content, userid };
            const respone = await this.request.post(`/forum`, body);
            e.target.reset();

            this.setup();
        });

        this.addEvent("click", "#addAnswer", (e) => {
            const array = e.target.parentNode.parentNode.parentNode.children;
            if (array["clonefrm"]) document.querySelector("#clonefrm").remove();
            else {
                const clone = commentfrm.cloneNode(true);
                clone.id = "clonefrm";
                const parent = e.target.parentNode.parentNode.parentNode;
                const groupIndex = parent.dataset.index;
                const btn = clone.querySelector("#qnaBtn");
                btn.innerHTML = "답변등록   ";
                parent.append(clone);
                clone.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const comment = clone.comment.value;
                    const userid = document.querySelector("#userid").value;
                    const body = {
                        userid,
                        parentid: groupIndex,
                        content: comment,
                    };
                    const respone = await this.request.post(`/forum`, body);
                    e.target.reset();
                    this.setup();
                });
            }
        });

        this.addEvent("click", "#btns", async (e) => {
            switch (e.target.id) {
                case "deleteBtn":
                    const commentidx = e.target.parentNode.parentNode.dataset.index;
                    if (confirm("삭제하시겠습니까")) {
                        if (confirm("정말로 삭제하시겠습니까")) {
                            const respone = await this.request.delete(`/forum/${commentidx}`);
                            if (respone.data === 1) this.setup();
                        } else {
                            return;
                        }
                    }

                    break;
                case "updateBtn":
                    const target = e.target.parentNode.parentNode;
                    const input = target.querySelector(".commentContent");
                    const span = document.createElement("span");
                    const btndiv = target.querySelector("#btns");
                    input.disabled = false;
                    input.focus();
                    span.id = "submitbtn";
                    span.innerHTML = "완료";
                    span.style.color = "#fff";
                    btndiv.append(span);
                    const update = target.querySelector("#updateBtn");
                    update.remove();
                    break;
                case "submitbtn":
                    if (confirm("수정하시겠습니까")) {
                        const commentidx = e.target.parentNode.parentNode.dataset.index;

                        const target = e.target.parentNode.parentNode;
                        const input = target.querySelector(".commentContent");
                        const comment = input.value;
                        const userid = document.querySelector("#userid").value;
                        const body = {
                            userid,
                            content: comment,
                        };
                        const path = document.location.pathname;
                        const [emptyval, board, id, idx] = path.split("/");
                        const respone = await this.request.put(`/forum/${commentidx}`, body);

                        if (respone.data === 1) this.setup();
                    } else {
                        return;
                    }

                    break;
            }
        });
    }
}

export default Qna;

