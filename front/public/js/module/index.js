// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch");

sortSwitch.value = location.search.indexOf("sort") === -1 ? "A.id" : location.search.split("=")[1];
categorySwitch.value = location.search.indexOf("category") === -1 ? "default" : location.search.split("=")[1];

// intersection observer
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((v) => {
//         if (v.isIntersecting) {
//             const target = v.target;
//             observer.unobserve(target);
//             // 다음 9개의 li 요소를 화면에 그리는 코드
//         }
//     });
// });

// const items = document.querySelectorAll(".boardItem");
// items.forEach((target) => {
//     observer.observe(target);
// });
// 글 감추기
const blindBtn = document.querySelector(".hideItem");
const itemId = document.querySelectorAll("#itemId");

// blindBtn.addEventListener('click', async (e) => {
//     console.log(e.target.parentNode.parentNode)
//     // const response = await request.post(`/boards/${itemId}/blind`, {
//     //     userid: userid.value,
//     //   });
// })
// const lili = document.querySelectorAll("#boardList > li");

// let lastli = lili[lili.length - 1];
// const empty = document.querySelector("#empty");

// let observe = new IntersectionObserver(async (e) => {
//     setTimeout(async () => {
//         count++;
//         console.log(lastli);
//         const content = document.querySelector("#boardList");
//         const list = await request.get(`boards/?count=${count}`);

//         list.data.forEach((v) => {
//             let li = document.createElement("li");
//             // v.level = "admin";
//             li.className = "boardItem";
//             const level = v.level === "admin" ? `<span class="hideItem"><iconify-icon icon="mdi:hide"></iconify-icon></span>` : " ";
//             const tag = !v.tagname
//                 ? `<li></li>`
//                 : v.tagname
//                       .split(",")
//                       .slice(0, 3)
//                       .map((v) => `<li>${v}</li>`);
//             li.innerHTML = `${level}
//                 <input type="hidden" value="${v.id}" id="itemId" />
//                 <a href="/board/${v.userid}/${v.id}">
//                     <div class="itemWrap">
//                         <div class="itemPartA">
//                             <div class="boardThumbnail">
//                                 <img src="${v.image}" alt="" loading="lazy" />
//                                 <span class="category">${v.category}</span>
//                             </div>
//                             <span class="boardTitle">${v.subject}</span>
//                             <ul class="tagList">
//                                 ${tag}
//                             </ul>
//                         </div>
//                         <div class="itemPartB">
//                             <span class="timeStamp" style="color: #999; font-size: 0.9em"
//                                 ><iconify-icon icon="ic:baseline-access-time-filled"></iconify-icon
//                                 ><span class="innerText">${v.createdAt.slice(0, -5).split("T").join(".").split(":").join(".")}</span></span
//                             >
//                             <span class="hitCount" style="color: #999; font-size: 0.9em"
//                                 ><iconify-icon icon="ic:baseline-remove-red-eye"></iconify-icon><span class="innerText">${v.hit}</span></span
//                             >
//                             <span class="commentCount" style="color: #999; font-size: 0.9em"
//                                 ><iconify-icon icon="mdi:message-processing"></iconify-icon><span class="innerText">${v.commentCount}</span></span
//                             >
//                         </div>
//                         <div class="itemPartC">
//                             <div><img class="userImg" src="${v.userImg}" alt="" loading="lazy" /><span class="nickName">${v.nickname}</span></div>
//                             <span style="font-size: 1.1em"><iconify-icon icon="flat-color-icons:like"></iconify-icon><span class="innerText">${v.likeCount}</span></span>
//                         </div>
//                     </div>
//                 </a>`;

//             content.append(li);
//         });
//     }, 3000);
// });

// observe.observe(empty);

// const temp = document.querySelector("#empty");

// console.log(content);

// const wrap = document.querySelector("#wrap");

// wrap.addEventListener("scroll", () => {
//     const scroll = wrap.scrollTop;
//     console.log("hi", scroll);
// });

///observe chat
// const button = document.querySelector("#empty");

// const observe = new IntersectionObserver((e) => {
//     console.log(e[0]);
//     if (e[0].isIntersecting) {
//         button.click();
//         observe.disconnect();
//     }
// });

// observe.observe(button);

// // const items = document.querySelector("", () => {});

// button.addEventListener("click", async (e) => {
//     count++;
// })

//Scroll Event;
let count = 0;
count = 0;
const scrollfix = 600;
let scroll = 600;
const content = document.querySelector("#boardList");

const wrap = document.querySelector("#wrap");
wrap.addEventListener("scroll", async (e) => {
    e.preventDefault();
    if (wrap.scrollTop > scroll) {
        count++;
        scroll += scrollfix;
        const list = await request.get(`boards/?count=${count}`);
        paging(list.data);
    }
});

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
    });
};

