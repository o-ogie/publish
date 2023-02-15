class forumController {
    constructor({ forumService }) {
        this.forumService = forumService;
    }
    async getview(req, res, next) {
        try {
            const list = await this.forumService.getlist();
            res.json(list);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = forumController;

