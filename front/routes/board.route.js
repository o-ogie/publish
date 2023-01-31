const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    res.render("board/main.html");
});

route.post("/", (req, res) => {
    const body = req.body;
    res.redirect("board");
});

route.get("/write", (req, res) => {
    res.render("board/write.html");
});

route.get("/:id", (req, res) => {
    res.render("board/idview.html");
});

route.get("/:id/:idx", (req, res) => {
    res.render("board/view.html");
});

route.get("/:id/:idx/modify", (req, res) => {
    res.render("board/modify.html");
});

module.exports = route;

