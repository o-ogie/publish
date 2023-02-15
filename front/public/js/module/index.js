import request from "/js/lib/request.js";

// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch");

sortSwitch.value = location.search.indexOf("sort") === -1 ? "A.id" : location.search.split("=")[1];
categorySwitch.value = location.search.indexOf("category") === -1 ? "default" : location.search.split("=")[1];


let count = 0;
const content = document.querySelector("#boardList");
const more = document.querySelector("#more");
const observer = new IntersectionObserver( async (entries) => {
    if (entries[0].isIntersecting) {
        count++;
        const response = await request.get(`boards/?count=${count}`);
        paging(response.data);
    }
});

observer.observe(more);


const paging = (data) => {
    data.forEach((v) => {
        let li = document.createElement("li");
        // v.level = "admin";
        li.className = "boardItem";
        const level = v.level === "admin" ? `<span class="hideItem"><iconify-icon icon="mdi:hide"></iconify-icon></span>` : " ";
        const tag = !v.tagname
            ? `<li></li>`
            : v.tagname
                  .split(",")
                  .slice(0, 3)
                  .map((v) => `<li>${v}</li>`);
        li.innerHTML = `${level}
                <input type="hidden" value="${v.id}" id="itemId" />
                <a href="/board/${v.userid}/${v.id}">
                    <div class="itemWrap">
                        <div class="itemPartA">
                            <div class="boardThumbnail">
                                <img src="${v.image}" alt="" loading="lazy" />
                                <span class="category">${v.category}</span>
                            </div>
                            <span class="boardTitle">${v.subject}</span>
                            <ul class="tagList">
                                ${tag}
                            </ul>
                        </div>
                        <div class="itemPartB">
                            <span class="timeStamp" style="color: #999; font-size: 0.9em"
                                ><iconify-icon icon="ic:baseline-access-time-filled"></iconify-icon
                                ><span class="innerText">${v.createdAt.slice(0, -5).split("T").join(".").split(":").join(".")}</span></span
                            >
                            <span class="hitCount" style="color: #999; font-size: 0.9em"
                                ><iconify-icon icon="ic:baseline-remove-red-eye"></iconify-icon><span class="innerText">${v.hit}</span></span
                            >
                            <span class="commentCount" style="color: #999; font-size: 0.9em"
                                ><iconify-icon icon="mdi:message-processing"></iconify-icon><span class="innerText">${v.commentCount}</span></span
                            >
                        </div>
                        <div class="itemPartC">
                            <div><img class="userImg" src="${v.userImg}" alt="" loading="lazy" /><span class="nickName">${v.nickname}</span></div>
                            <span style="font-size: 1.1em"><iconify-icon icon="flat-color-icons:like"></iconify-icon><span class="innerText">${v.likeCount}</span></span>
                        </div>
                    </div>
                </a>`;

        content.append(li);

        const category = document.querySelectorAll(".category");
        for (item of category) {
            if (item.innerHTML === "null") item.style.display = "none";
            item.className = `category ${item.innerHTML}`;
        }
    });
};
