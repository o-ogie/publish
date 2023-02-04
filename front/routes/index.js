const express = require("express");
const router = express.Router();
const user = require("./user.route");
const board = require("./board.route");

router.get("/", (req, res) => {
    // console.log(`req.user :`, req.user);
    if (req.user === undefined) return res.render("index.html");
    res.render("index.html", req.user);
});

router.get("/socket", (req, res) => {
    if (req.user === undefined) return res.render("index.html");
    console.log(req.user);
    res.render("socket.html");
});
router.use("/user", user);
router.use("/board", board);
// router.use("/admin", admin);

// 카카오 API 로그인 
KKO_HOST = `https://kauth.kakao.com`
REST_API_KEY = `e6dfa1b635337a7d85d3ef92c885670c`
REDIRECT_URI = `http://localhost:3000/auths/kakao`
CLIENT_SERCRET = `liSNdnbPh4yEOm9ZqSuocwothsK1tbKa`

router.get('/kakao/login', (req, res) => {
    const redirectURI = `${KKO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    res.redirect(redirectURI)
})


module.exports = router;
