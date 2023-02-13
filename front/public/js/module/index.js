// 셀렉트 옵션값 유지
const sortSwitch = document.querySelector("#sortSwitch");
const categorySwitch = document.querySelector("#categorySwitch");

sortSwitch.value =
  location.search.indexOf("sort") === -1
    ? "A.id"
    : location.search.split("=")[1];
categorySwitch.value =
  location.search.indexOf("category") === -1
    ? "default"
    : location.search.split("=")[1];




// intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(v => {
      if (v.isIntersecting) {
        const target = v.target;
        observer.unobserve(target);
        // 다음 9개의 li 요소를 화면에 그리는 코드
      }
    });
 });
  
const items = document.querySelectorAll('.boardItem');
  items.forEach((target) => {
    observer.observe(target);
  });