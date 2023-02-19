import Component from "/js/core/component.js";

class Comment extends Component {
    async setup() {
        const path = document.location.pathname;
        const [emptyval, board, id, idx] = path.split("/");
        const userid = null;
        const respone = await this.request.get(`/boards/${id}/${idx}/${userid}`);
        const [data, comment] = respone.data;
        this.setstatus({ list: comment, data: data });
    }

    mount() {
        const openRecomment = document.querySelectorAll("#openRecomment");
        openRecomment.forEach((v) => {
            const children = document.querySelectorAll(".child input[value]");
            const parentId = v.parentNode.querySelector("#parentId").value;
            let count = 0;
            for (const input of children) {
                if (input.value.split("-")[0] === parentId) {
                    count++;
                }
            }
            if (count === 0) v.style.display = "none";
            v.innerHTML = `답글 열기(${count})`;
            console.log(v);

            v.addEventListener("click", (e) => {
                const box = e.target.parentNode;
                const parentId = box.querySelector("#parentId").value;
                v.classList.toggle("close");
                if (v.className === "close") v.innerHTML = `답글 닫기`;
                else v.innerHTML = `답글 열기(${count})`;

                for (const input of children) {
                    if (input.value.split("-")[0] === parentId) {
                        let child = input.parentNode;
                        child.classList.toggle("open");
                    }
                }
            });
        });
    }

    templete() {
        // if (!this.target.querySelector("#userid") && !this.target.querySelector("#userlevel")) return;

        const list = this.state?.list;
        if (list === undefined) return "로딩중";
        const parent = this.target.parentNode;
        const count = this.state.data.commentCount;
        const userid = document.querySelector("#userid").value;
        const userlevel = document.querySelector("#userlevel").value;
        const url = "http://localhost:3005/board/";
        let recomment = `<button id="commentRecomment" class="commentBtn"><iconify-icon icon="mdi:comment-plus"></iconify-icon><span id="addComment">답글</span></button>`;
        const data = `
            <div id="total">
                    <h3>${count} 개의 댓글이 있습니다</h3>
            </div>
            <form method="post" action="" id="commentfrm">
                <div id="commentFrmInput">
                <input type="hidden" name="parentid" />
                <input type="text" name="comment" id="comment" placeholder="댓글을 입력해주세요" />
                </div>
                <button id="qnaBtn" type="submit">댓글 등록</button>
            </form>
            <div id="temp">
                <ul>${list
                    .map((v) => {
                        let clas = v.depth > 0 ? 'class="child"' : " ";
                        let btns =
                            userid === v.userid || userlevel === "admin"
                                ? `<button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon>수정</button>
                        <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>`
                                : " ";
                        let recommentbtn = v.depth > 0 ? " " : recomment;
                        let openRecomment =
                            v.depth > 0
                                ? " "
                                : `<div id="recommentBox">
                                <input type="hidden" value="${v.PATH}" id="parentId" />
                                <span id="openRecomment">답글 열기</span>
                            </div>`;
                        return `
                <li id="commentContent" ${clas} data-index="${v.id}">
                    <input type="hidden" value="${v.parentid}" id="parentId" />

                    <div class="writeData">
                        <span id="userimg">
                            <a href="${url}/${v.userid}"><img src="${v.userimg}" alt="" /></a>
                        </span>
                        <div>
                            <span id="commentUser" class="writer"><a href="${url}/${v.userid}">${v.userid}</a></span>
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
                    ${openRecomment}

                </li>`;
                    })
                    .join("")}
                </ul>
            </div>`;
        return data;
    }

    setEvent() {
        this.addEvent("submit", "#commentfrm", async (e) => {
            e.preventDefault();
            const commentfrm = document.querySelector("#commentfrm");
            const boardWirterid = document.querySelector("#userid");
            const parentid = commentfrm.parentid.value;
            const comment = commentfrm.comment.value;
            const userid = nowme.value;
            const body = {
                userid,
                parentid,
                content: comment,
                boardWirterid: boardWirterid.value,
            };
            const path = document.location.pathname;
            const [emptyval, board, id, idx] = path.split("/");
            if (comment === "") throw "내용이 없습니다.";
            const respone = await this.request.post(`/boards/${idx}/comments`, body);
            commentfrm.reset();
            this.setup();
        });

        this.addEvent("click", "#addComment", (e) => {
            const array = e.target.parentNode.parentNode.parentNode.children;
            if (array["clonefrm"]) document.querySelector("#clonefrm > form").remove();
            else {
                const commentfrm = document.querySelector("#commentfrm");
                const clone = commentfrm.cloneNode(true);
                clone.id = "clonefrm";
                const parent = e.target.parentNode.parentNode.parentNode;
                const groupIndex = parent.dataset.index;
                const pointUserid = parent.querySelector("#commentUser > a");
                parent.append(clone);
                clone.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const boardWirterid = document.querySelector("#userid");

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
                    const respone = await this.request.post(`/boards/${idx}/comments`, body);
                    this.setup();
                });
            }
        });

        this.addEvent("click", "#btns", async (e) => {
            switch (e.target.id) {
                case "deleteBtn":
                    const commentidx = e.target.parentNode.parentNode.dataset.index;
                    const path = document.location.pathname;
                    const [emptyval, board, id, idx] = path.split("/");
                    if (confirm("삭제하시겠습니까")) {
                        if (confirm("정말로 삭제하시겠습니까")) {
                            const respone = await this.request.delete(`/boards/${id}/comments/${commentidx}`);
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
                    input.addEventListener("keydown", async (e) => {
                        if (e.key === "Enter") {
                            document.querySelector("#submitbtn").click();
                        }
                    });
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
                        const respone = await this.request.put(`/boards/${id}/comments/${commentidx}`, body);
                        if (respone.data[0] === 1) this.setup();
                    } else {
                        return;
                    }

                    break;
            }
        });
    }
}

export default Comment;

`                <form method="post" action="" id="commentfrm">
                    <div id="commentFrmInput">
                        <input type="hidden" name="parentid" />
                        <input type="text" name="comment" id="comment" placeholder="댓글을 입력해주세요" />
                    </div>
                    <button type="submit">댓글 등록</button>
                </form>
                <div id="temp">
                    <ul>
                        {% for item in comment %} {% if item.depth === 0 %}
                        <li id="commentContent" data-index="{{item.id}}">
                            <div class="writeData">
                                <span id="userimg">
                                    <a href="http://localhost:3005/board/{{item.userid}}"><img src="{{item.userimg}}" alt="" /></a>
                                </span>
                                <div>
                                    <span id="commentUser" class="writer"><a href="http://localhost:3005/board/{{item.userid}}">{{item.userid}}</a></span>
                                    <span class="timeStamp" style="color: #999; font-size: 0.9em">
                                        <span id="commentDate" class="innerText writer">{{item.createdAt.slice(0,-5).split('T').join(".").split(':').join(".")}}</span>
                                    </span>
                                </div>
                            </div>
                            <input type="text" class="commentContent" value="{{item.content}}" disabled />
                            <div id="btns">
                                <button id="commentRecomment" class="commentBtn">
                                    <iconify-icon icon="mdi:comment-plus" style="margin-right: 1px"></iconify-icon> <span id="addComment">답글</span>
                                </button>
                                {% if item.userid === user.userid %}
                                <button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon>수정</button>
                                <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>
                                {% endif %}
                            </div>
                            <div id="recommentBox">
                                <input type="hidden" value="{{item.PATH}}" id="parentId" />
                                <span id="openRecomment">답글 열기</span>
                            </div>
                        </li>
                        {% else %}
                        <li id="commentContent" class="child" data-index="{{item.id}}">
                            <input type="hidden" value="{{item.PATH}}" id="parentId" />
                            <div class="writeData">
                                <span id="userimg">
                                    <a href="http://localhost:3005/board/{{item.userid}}"><img src="{{item.userimg}}" alt="" /></a>
                                </span>
                                <div>
                                    <span id="commentUser" class="writer"><a href="http://localhost:3005/board/{{item.userid}}">{{item.userid}}</a></span>
                                    <span class="timeStamp" style="color: #999; font-size: 0.9em">
                                        <span id="commentDate" class="innerText writer">{{item.createdAt.slice(0,-5).split('T').join(".").split(':').join(".")}}</span>
                                    </span>
                                </div>
                            </div>
                            <input type="text" class="commentContent" value="{{item.content}}" disabled />
                            <div id="btns">
                                {% if item.userid === user.userid %}
                                <button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon> 수정</button>
                                <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>
                                {% endif %}
                            </div>
                        </li>
                        {% endif %} {% endfor %}
`;

