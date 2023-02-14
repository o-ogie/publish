import request from "/js/lib/request.js";

const blindBtn = document.querySelectorAll(".hideItem");
const itemId = document.querySelectorAll("#itemId");
const boarditem = document.querySelector(".boardItem");
console.log(boarditem);
console.log(itemId.value);

blindBtn.forEach((button, index) => {
    button.addEventListener("click", async (e) => {
        const response = await request.post(`/boards/${itemId[index].value}/blind`, { id: itemId[index].value });
        console.log(response.data);
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
});

`
<div class="hiddenWrap">
    <span>
        <iconify-icon icon="fa6-solid:ban"></iconify-icon>: 차단된 게시글입니다
    </span>
</div>;
`;

