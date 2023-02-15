import request from "/js/lib/request.js"



// 유저 테이블
;(async ()=>{
    const {data} = await request.get('/admin/all')
    const userList = document.querySelector("#userList")
    // const li = document.createElement('li')
    // const span = document.createElement('span')
    // const updateBtn = document.createElement('button')
    
    data.forEach(user=>{
        const li = document.createElement('li')
        const span = document.createElement('span')
        const updateBtn = document.createElement('button')
        updateBtn.innerHTML='수정'
        span.innerHTML= JSON.stringify(user)
        li.append(span,updateBtn)
    
        userList.append(li)
    })
})()

// 좋아요, 조회수 
;(async ()=>{

    const {data} = await request.get('/admin/total')
    // console.log('좋아요, 조회수:::',data)
    const hit = document.querySelector('#hit_Total > span')
    const like = document.querySelector('#like_Total > span')

    hit.innerHTML=data.hitSum
    like.innerHTML=data.likeCount


})()


// 사용 많은 해쉬태그
;(async ()=>{

    const tags = document.querySelector('#tag > ul')
    const {data} = await request.get('/admin/tagRank')
    // console.log('tag::::',data)
    data.forEach(tag=>{
        const li = document.createElement('li')
        const tagname = document.createElement('span')
        const use = document.createElement('span')
        tagname.innerHTML= tag.tagname+'::: '
        use.innerHTML = tag.HashCount
        li.append(tagname,use)
    
        tags.append(li)
    })
})()


// 요일별 게시글 ( 최근 1주일 )
;(async()=>{
    
    const days = document.querySelector('#day')

    const {data} = await request.get('/admin/dayList')
    // console.log('day:::',data) 
    const Week_Table = ['월','화','수','목','금','토','일']
    const board_Count = []

    Week_Table.forEach(day=>{
        const span = document.createElement('span')
        board_Count.push(JSON.stringify(data).split(`${day}`).length-1)
        span.innerHTML = day+': '+ board_Count[board_Count.length-1]
        days.append(span)
    })

    Week_Table.forEach(day=>{
        const ul = document.createElement('ul')
        ul.innerHTML=day
        data.forEach(board=>{
            if(board.WEEK===day){
                const li = document.createElement('li')
                li.innerHTML = JSON.stringify(board)
                ul.append(li)
            }
        })
        days.append(ul)
    })
})()

// 등록 게시판 시간별
;(async ()=>{
    const time = document.querySelector('#time')

    const {data} = await request.get('/admin/timeList')
    console.log('time::::',data)
})()