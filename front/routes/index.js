const express = require("express");
const router = express.Router();
const user = require("./user.route");
const board = require("./board.route");

router.get("/", (req, res) => {
    // console.log(`req.user :`, req.user);
    if (req.user === undefined) return res.render("index.html");
    const { userid, username } = req.user;
    res.render("index.html", {
        userid,
        username,
    });
});
router.use("/user", user);
router.use("/board", board);
// router.use("/admin", admin);

module.exports = router;

