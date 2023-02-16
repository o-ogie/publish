import request from "/js/lib/request.js"

const Week_Table = ['월','화','수','목','금','토','일']
const Time_Table = Array(24).fill().map((arr, i) =>i)

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
/**
 * 게시글 수정으로 해쉬태그를 지워도 DB에 남아있는 현상 
*/
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
    const board_Count = []

    Week_Table.forEach(day=>{
        const span = document.createElement('span')
        let count = 0
        data.forEach(board=>{
            if(board.WEEK===day) count++
        })
        console.log('day, count',day, count)
        span.innerHTML = `${day}: ${count}개/ `
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
    const times = document.querySelector('#time')

    const {data} = await request.get('/admin/timeList')

    Time_Table.forEach(time=>{
        const span = document.createElement('span')
        let count = 0
        data.forEach(board=>{
            if(board.HOUR===time) count++
        })
        span.innerHTML = `${time}시: ${count}개/ `
        times.append(span)
    })

    Time_Table.forEach(time=>{
        const ul = document.createElement('ul')
        ul.innerHTML=time+'시'
        data.forEach(board=>{
            if(board.HOUR===time){
                const li = document.createElement('li')
                li.innerHTML = JSON.stringify(board)
                ul.append(li)
            }
        })
        times.append(ul)
    })

})()


// 카테고리 별 성별에 따른 좋아요
;(async()=>{
    const likes = document.querySelector('#likes')

    const {data} = await request.get('/admin/categoryGenderLike')
    console.log(data)

    data.forEach(like=>{
        const tag = document.querySelector('#tag')
        const div = document.createElement('div')
        div.innerHTML=`${like.category} ${like.male} ${like.female}`
        likes.append(div)
    })
})()

;(async()=>{
    const categoryList = document.querySelector('#categoryList > ul')

})()


