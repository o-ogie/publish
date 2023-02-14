const express = require("express");
const router = express.Router();
const { controller } = require("./board.module");
const upload = require("../../middlewares/boardup");

router.get("/", (req, res, next) => controller.getList(req, res, next));
router.get("/profile/:userid", (req, res, next) => controller.attention(req, res, next));
router.get("/:id", (req, res, next) => controller.getMain(req, res, next));
router.get("/:id/:idx/:userid", (req, res, next) => controller.getView(req, res, next));
router.get("/:id/favorites", (req, res, next) => controller.getFavor(req, res, next));
router.get("/:id/histories", (req, res, next) => controller.getHistory(req, res, next));
router.get("/:id/temp", (req, res, next) => controller.getTemp(req, res, next));

router.delete("/:id/temp", (req, res, next) => controller.delTemp(req, res, next));
router.post("/:id/blind", (req, res, next) => controller.postBlind(req, res, next));
router.post("/", (req, res, next) => controller.postWrite(req, res, next));
router.post("/temp", (req, res, next) => controller.postTemp(req, res, next));
router.post("/array", upload.fields([{ name: "upload1" }, { name: "mainimg" }]), (req, res) => {
    console.log(req.files);
    const { files } = req;
    const file = Object.values(files).map((v) => v[0].filename);
    // const files = req.files.map((v) => v.filename);
    console.log(file);
    res.send(file);
});

router.post("/decode", (req, res, next) => controller.decode(req, res, next));
router.put("/:idx", (req, res, next) => controller.putView(req, res, next));
router.delete("/:idx", (req, res, next) => controller.deleteView(req, res, next));

router.post("/:idx/comments", (req, res, next) => controller.postComment(req, res, next));
router.put("/:id/comments/:idx", (req, res, next) => controller.putComment(req, res, next));
router.delete("/:id/comments/:idx", (req, res, next) => controller.deleteComment(req, res, next));

router.post("/:id/:idx/likes", (req, res, next) => controller.postLike(req, res, next));
router.get("/:id/:idx/likes", (req, res, next) => controller.getcheck(req, res, next));
// router.delete("/:id/likes", (req, res, next) => controller.deleteLike(req, res, next));

// router.post("/single", upload.single("filename"), (req, res) => {
//     res.send(req.file);
// });

module.exports = router;

