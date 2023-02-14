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
    try {
        const { userid } = req.user;
        console.log("req.body:::", req.body);
        const { hashtag: text } = req.body;
        const respone = text.split(",");
        const body = {
            ...req.body,
            hashtag: respone,
            userid,
        };
        const response = await request.post("/boards", body);
        const { id: idx } = response.data;
        const { userid: id } = response.data;
        res.redirect(`board/${id}/${idx}`);
    } catch (e) {
        next(e);
    }
});
route.post("/temp", async (req, res) => {
    try {
        const { userid } = req.user;
        console.log("req.body:::", req.body);
        const response = await request.post("/boards", body);
    } catch (e) {
        next(e);
    }
});

route.get("/write", (req, res) => {
    try {
        const { userid } = req.user;
        res.render("board/write.html", { userid });
    } catch (e) {
        next(e);
    }
});
route.get("/:id", async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const response = await request.get(`/boards/${id}`);

        res.render("board/main.html", { user, list: response.data.main, tags: response.data.tagnames });
    } catch (e) {
        next(e);
    }
});

route.get("/temp/modify", async (req, res, next) => {
    try {
        const user = req.user;
        const respone = await request.get(`/boards/${user.userid}/temp`);
        const data = {
            ...respone.data,
            id: "temp",
        };
        console.log(data);

        res.render("board/modify.html", { data, user });
    } catch (e) {
        next(e);
    }
});

route.get("/:id/favorite", async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const favorite = await request.get(`/boards/${id}/favorites`);
        const history = await request.get(`/boards/${id}/histories`);
        res.render("board/favorite.html", { user, favorite: favorite.data, history: history.data });
    } catch (e) {
        next(e);
    }
});
// route.get("/:id/history", async (req, res) => {
//     const user = req.user;
//     const { id } = req.params;
//     const response = await request.get(`/boards/${id}/histories`);
//     console.log(user);
//     res.render("board/favorite.html", { user, list: response.data });
// });

route.get("/:id/:idx", async (req, res) => {
    try {
        const user = req.user;
        let userid = "";
        if (!user) {
            userid = "guest";
        } else {
            userid = req.user.userid;
        }
        const { id, idx } = req.params;
        const respone = await request.get(`/boards/${id}/${idx}/${userid}`);
        const [data, comment] = respone.data;
        console.log(comment);
        res.render("board/view.html", { data, user, comment });
    } catch (e) {
        next(e);
    }
});

route.get("/:id/:idx/modify", async (req, res) => {
    try {
        const { id, idx } = req.params;
        const user = req.user;
        const respone = await request.get(`/boards/${id}/${idx}/${user.userid}`);
        const [data, comment] = respone.data;
        res.render("board/modify.html", { data, user });
    } catch (e) {
        next(e);
    }
});

route.post("/:id/:idx/modify", async (req, res) => {
    try {
        const { userid } = req.user;
        let { id, idx } = req.params;
        const { hashtag: text } = req.body;
        const respone = text.split(",");
        const body = {
            ...req.body,
            hashtag: respone,
            userid,
        };
        const respones = await request.put(`/boards/${idx}`, body);
        if (idx === "temp") idx = respones.data.id;
        res.redirect(`/board/${id}/${idx}`);
    } catch (e) {
        next(e);
    }
});

module.exports = route;

