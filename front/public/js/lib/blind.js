import request from "/js/lib/request.js";

const blindBtn = document.querySelectorAll(".hideItem");
const itemId = document.querySelectorAll("#itemId");
console.log(itemId.value);

blindBtn.forEach((button, index) => {
  button.addEventListener("click", async (e) => {
    const response = await request.post(
      `/boards/${itemId[index].value}/blind`, { id: itemId[index].value });
    console.log(response.data);
  });
});
