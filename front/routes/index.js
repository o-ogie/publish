const express = require("express");
const router = express.Router();
const user = require("./user.route");
const board = require("./board.route");


router.get("/", (req, res) => {
    // console.log(`req.user :`, req.user);
    if (req.user === undefined) return res.render("index.html");
    const { userid, nickname, userImg } = req.user;
    res.render("index.html", {
        userid,
        nickname,
        userImg
    });
});

router.get('/socket',(req,res)=>{
    if (req.user === undefined) return res.render("index.html");
    console.log(1)
    console.log(req.user)
    res.render('socket.html')
})
router.use("/user", user);
router.use("/board", board);
// router.use("/admin", admin);


// 카카오 API 로그인 
const KKO_HOST = `https://kauth.kakao.com`
const REST_API_KEY = `1fe7ae4bf45bdf9bd6fc758bd63e9e0f`
const REDIRECT_URI = `http://localhost:3000/oauth/kakao`
const CLIENT_SERCRET = `1NLiTnJ7OOm09XyI4PrGAgIPwKispRor`

router.get('/kakao/login', (req, res) => {
    const redirectURI = `${KKO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    res.redirect(redirectURI)
})

// 백엔드에도 라우터 필요 oauth/kakao
//http://localhost:3000/oauth/kakao?code=JzHb7ZEbdA40F7zDUtbigH80UkTbvQZEm3ShUDBA9T8qekMZCzYXIrGpu_UNdEC5udxzAwoqJZEAAAGFyBRI0g


module.exports = router;

