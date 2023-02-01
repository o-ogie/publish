const express = require("express");
const router = express.Router();
const { controller } = require("./board.module");
const upload = require("../../middlewares/boardup");

router.get("/", (req, res, next) => controller.getList(req, res, next));
router.get("/:id", (req, res, next) => controller.getView(req, res, next));
router.post("/", (req, res, next) => controller.postWrite(req, res, next));
router.post("/array", upload.single("upload"), (req, res) => {
    console.log(req.file);
    // console.log(req.body);
    // res.send(req.files);
});
router.put("/:id", (req, res, next) => controller.putView(req, res, next));
router.delete("/:id", (req, res, next) => controller.deleteView(req, res, next));

router.post("/:id/comments", (req, res, next) => controller.postComment(req, res, next));
router.put("/:id/comments/:idx", (req, res, next) => controller.putComment(req, res, next));
router.delete("/:id/comments/:idx", (req, res, next) => controller.deleteComment(req, res, next));

router.post("/:id/likes", (req, res, next) => controller.postLike(req, res, next));
router.delete("/:id/likes", (req, res, next) => controller.deleteLike(req, res, next));

// router.post("/single", upload.single("filename"), (req, res) => {
//     res.send(req.file);
// });

module.exports = router;

