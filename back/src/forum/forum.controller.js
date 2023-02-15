class forumController {
    constructor({ forumService }) {
        this.forumService = forumService;
    }
    async getview(req, res, next) {
        try {
            const [list, comment] = await this.forumService.getlist();
            res.json([list, comment]);
        } catch (e) {
            next(e);
        }
    }

    async postQna(req, res, next) {
        try {
            await this.forumService.postQ(req.body);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = forumController;

