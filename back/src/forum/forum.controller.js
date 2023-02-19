class forumController {
    constructor({ forumService }) {
        this.forumService = forumService;
    }
    async getview(req, res, next) {
        try {
            const { userid, level } = req.params;
            const [list, comment] = await this.forumService.getlist({ userid, level });
            res.json([list, comment]);
        } catch (e) {
            next(e);
        }
    }

    async postQna(req, res, next) {
        try {
            const respone = await this.forumService.postQ(req.body);
            res.json(respone);
        } catch (e) {
            next(e);
        }
    }

    async putQna(req, res, next) {
        try {
            const { commentidx } = req.params;
            const body = req.body;
            const respone = await this.forumService.putQna({ commentidx, body });
            res.json(respone);
        } catch (e) {
            next(e);
        }
    }

    async delQna(req, res, next) {
        try {
            const { commentidx } = req.params;
            const respone = await this.forumService.delQna(commentidx);
            res.json(respone);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = forumController;

