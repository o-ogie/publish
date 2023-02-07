class BoardRepository {
    constructor({ sequelize, Board, Hashtag, Comment, User, Hash, Liked }) {
        this.sequelize = sequelize;
        this.Board = Board;
        this.Hashtag = Hashtag;
        this.Comment = Comment;
        this.User = User;
        this.Hash = Hash;
        this.Liked = Liked;
    }

    async findAll(where) {
        try {
            const query = `SELECT 
      A.id,
      A.userid, 
      B.username, 
      A.subject, 
      A.content,
      A.createdAt, 
      A.hit,
      B.userImg,
      B.nickname,
      (SELECT GROUP_CONCAT(D.userid SEPARATOR ', ') FROM Liked AS D WHERE A.id = D.boardid) AS likeidlist,
      GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
      (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
      (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
      FROM Board AS A 
      JOIN User AS B 
      ON A.userid = B.userid
      JOIN Hashtag AS C
      ON A.id = C.boardid
      Where A.id = ${where}
      GROUP BY A.id
      ORDER BY A.id DESC;`;
            const [findAll] = await this.sequelize.query(query);
            return findAll;
        } catch (e) {
            throw new Error(e);
        }
    }

    async findOne(id, idx) {
        try {
            const [view] = await this.findAll(idx);

            const comment = await this.Comment.findAll({
                raw: true,
                where: { boardid: idx },
            });
            // const hashtag = await this.Hashtag.findAll({
            //     attributes: ["tagname"],
            //     raw: true,
            //     where: { boardid: idx },
            // });
            return [view, comment];
        } catch (e) {
            throw new Error(e);
        }
    }
    async createBoard({ userid, subject, content, hashtag }) {
        try {
            const createBoard = await this.Board.create({ userid, subject, content });
            const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));

            const tagResult = await Promise.all(addHash);
            await createBoard.addHashes(tagResult.map((v) => v[0]));
            console.log(createBoard);
            return createBoard.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateBoard({ id, subject, content, hashtag }) {
        console.log("update :", id, subject, content, hashtag);
        try {
            const updateBoard = await this.Board.update(
                {
                    subject: subject,
                    content: content,
                },
                { where: { id: id } }
            );
            const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
            await this.Hashtag.destroy({ where: { boardid: id } });
            const addHashTag = hashtag.map((tagname) => this.Hashtag.create({ boardid: id, tagname }));
            await Promise.all(addHash, addHashTag);
            return updateBoard;
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyBoard(id) {
        console.log("repo :", id);
        try {
            const destroy = await this.Board.destroy({
                where: { id: id },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createComment(commentData) {
        console.log("repo :", commentData);
        try {
            console.log(typeof commentData.group);
            const create = await this.Comment.create(commentData);
            return create.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateComment({ id, content }) {
        console.log("update :", id, content);
        try {
            const update = await this.Comment.update(
                {
                    content: content,
                },
                { where: { id: id } }
            );
            return update;
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyComment(id) {
        console.log("repo :", id);
        try {
            const destroy = await this.Comment.destroy({
                where: { id: id },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createLike({ boardid, userid }) {
        console.log("repo :", boardid, userid);
        try {
            const check = await this.Liked.findOne({ where: { boardid, userid } });
            console.log(check);
            if (check === null) {
                await this.Liked.create({ boardid, userid });
            } else {
                await this.Liked.destroy({ where: { boardid, userid } });
            }
            const count = await this.Liked.findAndCountAll({
                where: { boardid },
            });
            const recheck = await this.Liked.findOne({ raw: true, where: { boardid, userid } });
            return [count.count, recheck];
        } catch (e) {
            throw new Error(e);
        }
    }
    async destroyLike({ boardid, userid }) {
        console.log("repo :", { boardid, userid });
        try {
            const destroy = await this.Liked.destroy({
                where: {
                    BoardId: boardid,
                    userid: userid,
                },
            });
            return destroy;
        } catch (e) {
            throw new Error(e);
        }
    }

    async likecheck({ userid, boardid }) {
        try {
            const respone = await this.Liked.findAll();
        } catch (e) {}
    }
}

module.exports = BoardRepository;

