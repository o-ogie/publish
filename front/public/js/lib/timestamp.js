// 글작성 시간
const timeStamps = document.querySelectorAll(".timeStamp .innerText");
const timeStrings = Array.from(timeStamps).map((v) => v.innerText);

// 현재 시간
const offset = 1000 * 60 * 60 * 9
const thisTime = new Date((new Date()).getTime() + offset).toISOString().slice(0, -5).split("T").join(".").split(":").join(".");
console.log(thisTime)
// 방금전 몇분전
timeStrings.forEach((timeStamp, index) => {
    const splitTimeStamp = timeStamp.split(".");
    const splitThisTime = thisTime.split(".");

    if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] === splitTimeStamp[1] && splitThisTime[2] === splitTimeStamp[2]) {
        timeStamps[index].innerHTML = "방금전";
    } else if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] === splitTimeStamp[1] && splitThisTime[2] !== splitTimeStamp[2]) {
        timeStamps[index].innerHTML = `${splitThisTime[2] - splitTimeStamp[2]}분전`;
    } else if (splitThisTime[0] === splitTimeStamp[0] && splitThisTime[1] - splitTimeStamp[1] < 24) {
        timeStamps[index].innerHTML = `${splitThisTime[1] - splitTimeStamp[1]}시간전`;
    } else {
        timeStamps[index].innerHTML = splitTimeStamp[0];
    }
});

