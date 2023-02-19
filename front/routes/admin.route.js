const express = require("express");
const route = express.Router();
const axios = require("axios");

const request = axios.create({
    baseURL: "http://54.180.142.99:80",
    withCredentials: true,
});

route.get("/", (req, res) => {
    res.render("admin/admin.html");
});

route.get("/", (req, res) => {
    res.render("admin/info.html");
});


module.exports = route;