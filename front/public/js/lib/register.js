const thisTime = new Date().toISOString().slice(0,-5).split('T').toString();
console.log(`thisTime:::`, thisTime)


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