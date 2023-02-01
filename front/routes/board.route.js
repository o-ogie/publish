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

// route.post("/array", async (req, res) => {
//     const body = req.body;
//     console.log(body);
//     // const respons = await request.post("/board/array", body, {
//     //     headers: {
//     //         ["Content-Type"]: "multipart/form-data",
//     //     },
//     // });
//     // console.log(respons);
// });

route.post("/", async (req, res) => {
    const { userid } = req.user;
    const { hashtag: text } = req.body;
    const respone = text.split(",");
    const body = {
        ...req.body,
        hashtag: respone,
        userid,
    };
    console.log(body);

    const respones = await request.post("/boards", body);
    // console.log(respones);
    res.redirect("board");
});

// route.post("/array", (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
// });

route.get("/write", (req, res) => {
    res.render("board/write.html");
});

// route.get("/:id", (req, res) => {
//     res.render("board/idview.html");
// });

route.get("/:id/:idx", (req, res) => {
    res.render("board/view.html");
});

route.get("/:id/:idx/modify", (req, res) => {
    res.render("board/modify.html");
});

module.exports = route;

