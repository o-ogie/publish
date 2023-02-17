import Component from "/js/core/component.js";

class Qna extends Component {
    async setup() {
        const list = await axios.get("http://54.180.142.99:80/forum");
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
        const recomment = userlevel === "admin" ? `<button id="commentRecomment" class="commentBtn"><iconify-icon icon="mdi:comment-plus" style="margin-right: 4px"></iconify-icon>답글</button>` : " ";
        const data = list
            .map((v) => {
                let btns =
                    userid === v.userid
                        ? `<button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon>수정</button>
                        <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>`
                        : " ";
                return `
            <li id="commentContent" data-index="${v.id}">
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
                ${recomment}
                ${btns}
                </div>  
            </li>`;
            })
            .join("");

        return data;
    }

    setEvent() {
        this.addEvent("click", "#commentRecomment", (e) => {
            console.log("hihi");
        });
    }
}

export default Qna;

