const express = require("express");
const route = express.Router();
const axios = require("axios");

const request = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

route.get("/", (req, res) => {
    res.render("board/main.html");
});

route.post("/", async (req, res) => {
    const { userid } = req.user;
    const { hashtag: text } = req.body;
    console.log(req.body);
    const respone = text.split(",");
    const body = {
        ...req.body,
        hashtag: respone,
        userid,
    };
    const respones = await request.post("/boards", body);
    res.redirect("board");
});

route.get("/write", (req, res) => {
    res.render("board/write.html");
});
route.get("/:id/:idx", (req, res) => {
    res.render("board/view.html");
});

route.get("/:id/:idx/modify", (req, res) => {
    res.render("board/modify.html");
});

module.exports = route;

