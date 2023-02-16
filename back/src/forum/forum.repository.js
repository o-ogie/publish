class forumRepository {
    constructor({ sequelize, models }) {
        this.Board = models.Board;
        this.Comment = models.Comment;
        this.sequelize = sequelize;
    }

    async getnotice() {
        try {
            const list = await this.Board.findAll({ raw: true, where: { category: "notice" } });
            const qnaBoard = await this.Board.findOne({ raw: true, where: { category: "QnA" } });
            const idx = qnaBoard.id;
            const [comment] = await this.sequelize.query(`
            WITH RECURSIVE comments (id, content, depth, parentid, createdAt, updatedAt, boardid, userid, PATH) AS (
SELECT id, content, depth, parentid, createdAt, updatedAt, boardid, userid, CAST(id AS CHAR(100))
FROM Comment
WHERE parentid = 0
UNION ALL
SELECT t.id, t.content, comments.depth + 1, t.parentid, t.createdAt, t.updatedAt, t.boardid, t.userid, concat(comments.PATH, '-', t.id)
FROM comments
JOIN Comment t ON comments.id = t.parentid
)
SELECT comments.*, B.userimg
FROM comments
JOIN User AS B
ON comments.userid = B.userid
WHERE comments.boardid = ${idx}
ORDER BY PATH;`);

            const board = await this.Board.findAll({ raw: true });
            return [list, comment];
        } catch (e) {
            throw new Error();
        }
    }

    async post(data) {
        try {
            const { parentid, comment: content, userid } = data;
            const qnaBoard = await this.Board.findOne({ raw: true, where: { category: "QnA" } });
            const boardid = qnaBoard.id;
            const a = await this.Comment.create({ content, parentid, boardid, userid });
        } catch (e) {}
    }
}

module.exports = forumRepository;

