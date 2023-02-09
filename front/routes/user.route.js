const express = require("express");
const route = express.Router();
const axios = require("axios");
const config = require("../config");

const request = axios.create({
    baseURL: `http://${config.BACK_HOST}:${config.PORT}`,
    withCredentials: true,
});

route.get("/signup", (req, res) => {
    res.render("user/signup.html");
});

route.post("/signup", async (req, res) => {
    const response = await request.post("/users", {
        ...req.body,
    });
    const { userid, username, userpw } = response.data;

    // res.redirect(`/user/welcome?userid=${userid}&username=${username}&userpw=${userpw}`);
    res.redirect('/')
});

route.get("/welcome", (req, res) => {
    const { userid, username, userpw } = req.query;
    const user = {
        userid,
        username,
        userpw,
    };
    res.render("user/welcome.html", {
        user,
    });
});

route.get("/signin", (req, res) => {
    res.render("user/signin.html");
});

route.get("/profile", async (req, res) => {
    const user = req.user;
    // const response = await request.post("/users", {
    //     ...req.body,
    // });
    // console.log(response.data)

    res.render("user/profile.html", { user, ...req.user });
});

route.get("/modify", (req, res) => {
    const user = req.user;
    res.render("user/modify.html", { user, ...req.user });
});

route.post("/modify", async (req, res) => {
    // console.log("modify:::", req.body)
    const response = await request.put("/users", { ...req.body });
    console.log("response :", response.data.token);
    res.cookie("token", response.data.token);
    await res.redirect("/user/profile");
});

route.post("/delete", async (req, res) => {
    console.log("delete:::", req.body.userid);
    const response = await request.delete(`/users/${req.body.userid}`);
    res.cookie("token", response.data.token);
    await res.redirect("/");
});

module.exports = route;

