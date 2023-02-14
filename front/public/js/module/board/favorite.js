const items = document.querySelectorAll("#navigationTab li");
items.forEach((item) => {
  item.addEventListener("click", async () => {
    items.forEach((v) => {
      v.classList.remove("active");
    });
    item.classList.add("active");

    if (document.querySelector(".favorite").classList.contains("active")) {
      document.querySelector("#favoriteList").style.display = "block";
      document.querySelector("#historyList").style.display = "none";
    } else if (
      document.querySelector(".history").classList.contains("active")
    ) {
      document.querySelector("#historyList").style.display = "block";
      document.querySelector("#favoriteList").style.display = "none";
    }
  });
});
