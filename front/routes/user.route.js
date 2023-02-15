const express = require("express");
const route = express.Router();
const axios = require("axios");
const config = require("../config.js");

const request = axios.create({
    baseURL: `http://${config.BACK_HOST}:${config.PORT}`,
    withCredentials: true,
});

route.get("/signup", (req, res, next) => {
    res.render("user/signup.html");
});

route.post("/signup", async (req, res, next) => {
    try {
        console.log(`req:::`, req.body);
        const response = await request.post("/users", {
            ...req.body,
        });
        const { userid, username, userpw } = response.data;
        if (response.data.status >= 400) {
            throw response.data;
        }
        res.redirect("/");
    } catch (e) {
        next(e);
    }

    // res.redirect(`/user/welcome?userid=${userid}&username=${username}&userpw=${userpw}`);
});

route.get("/welcome", (req, res, next) => {
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

route.get("/signin", (req, res, next) => {
    res.render("user/signin.html");
});

route.get("/profile", async (req, res, next) => {
    try {
        const user = req.user;
        const response = await request.get(`/users/point/${user.userid}`);
        const point = response.data;
        console.log(point);
        const mypoint = {
            mypoint: point.length * 10,
        };

        res.render("user/profile.html", { user, ...req.user, point, mypoint });
    } catch (e) {
        next(e);
    }
});

route.get("/modify", (req, res, next) => {
    const user = req.user;
    res.render("user/modify.html", { user, ...req.user });
});

route.post("/modify", async (req, res, next) => {
    try {
        // console.log("modify:::", req.body)
        const response = await request.put("/users", { ...req.body });
        console.log("response :", response.data.token);
        res.cookie("token", response.data.token);
        await res.redirect("/user/profile");
    } catch (e) {
        next(e);
    }
});

route.post("/delete", async (req, res, next) => {
    try {
        console.log("delete:::", req.body.userid);
        const response = await request.delete(`/users/${req.body.userid}`);
        res.cookie("token", response.data.token);
        await res.redirect("/");
    } catch (e) {
        next(e);
    }
});

module.exports = route;

