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
    // console.log(`response :`, response);
    const { userid, username, userpw } = response.data;

    res.redirect(`/user/welcome?userid=${userid}&username=${username}&userpw=${userpw}`);
});

route.get("/welcome", (req, res) => {
    const { userid, username, userpw } = req.query;
    res.render("user/welcome.html", {
        userid,
        username,
        userpw,
    });
});

route.get("/signin", (req, res) => {
    res.render("user/signin.html");
});

route.get("/profile", (req, res) => {
    console.log(req.user)
    res.render("user/profile.html", { ...req.user });
});

route.get("/modify", (req, res) => {
    res.render("user/modify.html", { ...req.user });
});

route.post("/modify", async (req, res) => {
    console.log("modify:::", req.body)
    const response = await request.put("/users", { ...req.body });
    // console.log("response :", response.data.token);
    res.cookie("token", response.data.token);
    await res.redirect("/user/profile");
});

module.exports = route;

