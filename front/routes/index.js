const express = require("express");
const router = express.Router();
const user = require("./user.route");
const board = require("./board.route");
const admin = require("./admin.route");
const axios = require("axios");
const config = require("../config.js");

const request = axios.create({
    baseURL: `http://${config.BACK_HOST}:${config.PORT}`,
    withCredentials: true,
});

router.get("/", async (req, res) => {
    // console.log(`req.user :`, req.user);
    const { searchType, search, sort, category } = req.query;
    console.log("index::::: st sch srt cate", searchType, search, sort, category);
    const respone = await request.get("/boards/", { data: { searchType, search, sort, category } });
    const list = respone.data;
    // console.log(list)
    // if( req.query.searchType){
    //     const {searchType, search} = req.query

    //     res.render("index.html",{list:searchList})
    //     return
    // }
    // if (req.user === undefined) return res.render("index.html", { list });
    console.log(req.user);
    res.render("index.html", { user: req.user, list });
});

router.get("/forum", async (req, res) => {
    // console.log(`req.user :`, req.user);
    const list = await request.get("/forum");
    const [notice, comment] = list.data;

    res.render("forum.html", { user: req.user, notice, comment });
});

router.post("/forum", async (req, res, next) => {
    try {
        const body = {
            ...req.body,
            userid: req.user.userid,
        };
        const user = req.user;
        await request.post("/forum", body);
        res.redirect("/forum", { user });
    } catch (e) {
        next(e);
    }
});

router.get("/socket", (req, res) => {
    if (req.user === undefined) return res.render("index.html");
    console.log(req.user);
    res.render("socket.html");
});
router.use("/user", user);
router.use("/board", board);
router.use("/admin", admin);

// 카카오 API 로그인
KKO_HOST = `https://kauth.kakao.com`;
REST_API_KEY = `e6dfa1b635337a7d85d3ef92c885670c`;
REDIRECT_URI = `http://54.180.142.99:80/auths/kakao`;
CLIENT_SERCRET = `liSNdnbPh4yEOm9ZqSuocwothsK1tbKa`;

router.get("/kakao/login", (req, res) => {
    const redirectURI = `${KKO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    res.redirect(redirectURI);
});

module.exports = router;

