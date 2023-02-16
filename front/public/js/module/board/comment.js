class Component {
    state;
    target;
    constructor(_target) {
        this.target = _target;
        this.setup();
        this.render();
        this.addEvent();
    }

    async render() {
        this.target.innerHTML = await this.templete(state);
    }
    setup() {}
    async templete(state) {
        // <li id="commentContent" data-index="{{item.id}}">
        //                             <div class="writeData">
        //                                 <span id="userimg">
        //                                     <img src="{{item.userimg}}" alt="" />
        //                                 </span>
        //                                 <div>
        //                                     <span id="commentUser" class="writer">{{item.userid}}</span>
        //                                     <span class="timeStamp" style="color: #999; font-size: 0.9em">
        //                                         <span id="commentDate" class="innerText writer">{{item.createdAt.slice(0,-5).split('T').join(".").split(':').join(".")}}</span>
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                             <input type="text" class="commentContent" value="{{item.content}}" disabled />
        //                             <div id="btns">
        //                                 <button id="commentRecomment" class="commentBtn"><iconify-icon icon="mdi:comment-plus" style="margin-right: 4px"></iconify-icon>답글</button>
        //                                 {% if item.userid === user.userid %}
        //                                 <button id="updateBtn" class="commentBtn"><iconify-icon icon="mdi:comment-edit" style="margin-right: 4px"></iconify-icon>수정</button>
        //                                 <button id="deleteBtn" class="commentBtn"><iconify-icon icon="mdi:comment-remove" style="margin-right: 4px"></iconify-icon> 삭제</button>
        //                                 {% endif %}
        //                             </div>
        //                             <div id="recommentBox">
        //                                 <input type="hidden" value="{{item.PATH}}" id="parentId" />
        //                                 <span id="openRecomment"><iconify-icon icon="octicon:triangle-down-24"></iconify-icon>답글 열기</span>
        //                             </div>
        //                         </li>
    }

    addEvent(type, select, callback) {
        const children = [...document.querySelectorAll(select)];
        const isTarget = (target) => children.includes(target) || target.closest(select);

        this.target.addEventListener(type, (e) => {
            if (!isTarget(e.target)) return false;
            callback(e);
        });
    }

    setstatus(newstate) {
        if (this.state === newstate) return;
        this.state = newstate;
    }
}

export default Component;

