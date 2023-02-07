
const getTimeNow = (date) => {
  let mm = date.getMonth() + 1;
  mm = (mm > 9 ? "" : "0") + mm;
  let dd = date.getDate();
  dd = (dd > 9 ? "" : "0") + dd;
  let yy = date.getFullYear();

  let hr = date.getHours();
  let mn = date.getMinutes();
  let sc = date.getSeconds();
  return [yy, mm, dd].join("-") + "." + [hr, mn, sc].join(".");
};
const thisTime = getTimeNow(new Date());
console.log(thisTime);


// 방금전 몇분전
parsedTime.forEach((timeLine, index) => {
  const splitTimeLine = timeLine.split(".");
  const splitThisTime = thisTime.split(".");

  if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] === splitTimeLine[1] &&
    splitThisTime[2] === splitTimeLine[2]
  ) {
    timeLines[index].innerHTML = "방금전";
  } else if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] === splitTimeLine[1] &&
    splitThisTime[2] !== splitTimeLine[2]
  ) {
    timeLines[index].innerHTML = `${splitThisTime[2] - splitTimeLine[2]}분전`;
  } else if (
    splitThisTime[0] === splitTimeLine[0] &&
    splitThisTime[1] - splitTimeLine[1] < 13
  ) {
    timeLines[index].innerHTML = `${splitThisTime[1] - splitTimeLine[1]}시간전`;
  } else {
    timeLines[index].innerHTML = splitTimeLine[0];
  }
});