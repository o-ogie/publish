import request from "/js/lib/request.js";

const restemp = async () => {
    const userid = document.querySelector("#insert > input");
    const response = await request.get(`/boards/${userid.value}/temp`);
    const date = response.data.createdAt;
    if (response.data)
        if (confirm(`${date} 저장한 데이터가 있습니다 불러오시겠습니까`)) {
            location.href = `/board/temp/modify`;
        } else {
            await request.delete(`/boards/${userid.value}/temp`);
        }
};

restemp();

