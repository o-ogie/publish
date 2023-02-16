import request from "/js/lib/request.js";

// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch");

let options = {};
if (location.search)
    options = location.search
        .split("?")[1]
        .split("&")
        .reduce((acc, val) => {
            let [k, y] = val.split("=");
            acc[k] = y;
            return acc;
        }, {});

if (!options["sort"]) options.sort = "A.id";
if (!options["category"]) options.category = "default";
sortSwitch.value = options.sort;
categorySwitch.value = options.category;

console.log(options);

let count = 0;
const content = document.querySelector("#boardList");
const more = document.querySelector("#more");
const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
        count++;
        const response = await request.get(`boards/?count=${count}&&sort=${options.sort}&&category=${options.category}`);
        console.log(response.data);
        paging(response.data);
    }
});

observer.observe(more);

const offset = 1000 * 60 * 60 * 9;
const thisTime = new Date(new Date().getTime() + offset).toISOString().slice(0, -5).split("T").join(".").split(":").join(".");

const timetime = (timeStamp) => {
    const splitTimeStamp = timeStamp.split("."); //[2023-02-15, 14,30,32]
    const splitThisTime = thisTime.split(".");

    const splitDate = timeStamp.split("-")[2].split(".")[0];
    const splitThisDay = thisTime.split("-")[2].split(".")[0];

    if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] === splitTimeStamp[1] && splitThisTime[2] === splitTimeStamp[2]) {
        return "방금 전";
    } else if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] === splitTimeStamp[1] && splitThisTime[2] !== splitTimeStamp[2]) {
        return `${splitThisTime[2] - splitTimeStamp[2]}분 전`;
    } else if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] - splitTimeStamp[1] < 24) {
        return `${splitThisTime[1] - splitTimeStamp[1]}시간 전`;
    } else if (splitThisDay > splitDate) {
        if (splitThisDay - splitDate <= 7) {
            return `${splitThisDay - splitDate}일 전`;
        } else return splitTimeStamp[0];
    }
};

const blindHandler = (button, itemId) => {
    button.addEventListener("click", async (e) => {
        const response = await request.post(`/boards/${itemId.value}/blind`, { id: itemId.value });
        switch (response.data) {
            case "blind":
                const span = e.target.parentNode.parentNode.children[0];
                const div = document.createElement("div");
                div.className = "hiddenWrap";
                div.innerHTML = `<span>
            <iconify-icon icon="fa6-solid:ban"></iconify-icon>: 차단된 게시글입니다
        </span>`;
                span.after(div);
                break;
            case "public":
                const li = e.target.parentNode.parentNode;
                const hiddenWrap = li.querySelector(".hiddenWrap");
                hiddenWrap.remove();
                break;
        }
    });
};

const level = document.querySelector("#userLevel").value;

const paging = (data) => {
    data.forEach((v) => {
        let li = document.createElement("li");
        console.log(v.state);
        let state =
            v.state === "blind"
                ? `<div class="hiddenWrap">
                    <span><iconify-icon icon="fa6-solid:ban"></iconify-icon>: 차단된 게시글입니다</span>
                </div>`
                : " ";
        // v.level = "admin";
        li.className = "boardItem";
        const levelspan = level === "admin" ? `<span class="hideItem"><iconify-icon icon="mdi:hide"></iconify-icon></span>` : " ";
        const tag = !v.tagname
            ? ``
            : v.tagname
                  .split(",")
                  .slice(0, 3)
                  .map((v) => `<li>${v}</li>`);
        li.innerHTML = `${levelspan}
        ${state}
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

        const ehlsk = li.querySelector(".innerText");
        ehlsk.innerHTML = timetime(ehlsk.innerHTML);

        const blindBtn = li.querySelector(".hideItem");
        const itemId = li.querySelector("#itemId");
        if (blindBtn) blindHandler(blindBtn, itemId);

        const category = document.querySelectorAll(".category");
        for (item of category) {
            if (item.innerHTML === "null") item.style.display = "none";
            item.className = `category ${item.innerHTML}`;
        }
    });
};

