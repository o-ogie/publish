const express = require("express");
const router = express.Router();
const { controller } = require("./forum.module");

router.get("/", (req, res, next) => controller.getview(req, res, next));
router.post("/", (req, res, next) => controller.postQna(req, res, next));

module.exports = router;

