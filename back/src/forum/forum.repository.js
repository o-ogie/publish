class forumRepository {
    constructor({ models }) {
        this.Board = models.Board;
        this.Comment = models.Comment;
    }

    async getnotice() {
        try {
            const list = await this.Board.findAll({ raw: true, where: { category: "notice" } });
            return list;
        } catch (e) {
            throw new Error();
        }
    }
}

module.exports = forumRepository;

