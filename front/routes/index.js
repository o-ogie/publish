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
    console.log(req.user)
    res.render('socket.html')
})
router.use("/user", user);
router.use("/board", board);
// router.use("/admin", admin);

module.exports = router;

