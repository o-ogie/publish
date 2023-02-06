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
    const respone = text.split(",");
    const body = {
        ...req.body,
        hashtag: respone,
        userid,
    };
    const respones = await request.post("/boards", body);
    const { id: idx } = respones.data;
    const { userid: id } = respones.data;
    res.redirect(`board/@${id}/${idx}`);
});

route.get("/write", (req, res) => {
    res.render("board/write.html");
});
route.get("/:id/:idx", async (req, res) => {
    const user = req.user;
    const { id, idx } = req.params;
    const respone = await request.get(`/boards/${id}/${idx}`);
    const [data, comment] = respone.data;
    res.render("board/view.html", { data, user });
});

route.get("/:id/:idx/modify", (req, res) => {
    res.render("board/modify.html");
});

module.exports = route;

