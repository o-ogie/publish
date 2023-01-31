const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.render("board/view.html");
});

module.exports = route;
