const express = require("express");
const router = express.Router();
const { controller } = require("./forum.module");

router.get("/:userid/:level", (req, res, next) => controller.getview(req, res, next));
router.post("/", (req, res, next) => controller.postQna(req, res, next));
router.put("/:commentidx", (req, res, next) => controller.putQna(req, res, next));
router.delete("/:commentidx", (req, res, next) => controller.delQna(req, res, next));

module.exports = router;

