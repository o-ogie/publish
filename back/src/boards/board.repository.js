class BoardRepository {
    constructor({ sequelize, Board, Temp, Hashtag, Comment, User, Hash, Liked, PointUp }) {
        this.sequelize = sequelize;
        this.Board = Board;
        this.Temp = Temp;
        this.Hashtag = Hashtag;
        this.Comment = Comment;
        this.User = User;
        this.Hash = Hash;
        this.Liked = Liked;
        this.PointUp = PointUp;
    }

    async findAll({ searchType, search, sort, category, limit }) {
        try {
            let where;
            if ((searchType === "A.subject") | (searchType === "A.content")) {
                where = `WHERE ${searchType} LIKE '%${search}%'`;
            } else {
                where = !searchType ? "" : `WHERE ${searchType}="${search}"`;
            }
            const sortKey = !sort ? `ORDER BY A.id DESC` : `ORDER BY ${sort} DESC`;
            const categoryKey = !category ? `` : `WHERE category="${category}"`;
            const limitquery = !limit ? `` : `Limit ${limit.limit}, ${limit.views}`;

            const query = `SELECT 
        A.id,
        A.userid, 
        A.subject, 
        A.content,
        A.createdAt, 
        A.hit,
        A.image,
        A.category,
        B.userImg,
        B.nickname,
        GROUP_CONCAT(C.tagname SEPARATOR ', ') AS tagname,
        (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
        (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount
        FROM Board AS A 
        JOIN User AS B 
        ON A.userid = B.userid
        JOIN Hashtag AS C
        ON A.id = C.boardid
        ${where}${categoryKey}
        GROUP BY A.id
        ${sortKey}
        ${limitquery};`;
            const [findAll] = await this.sequelize.query(query);
            // console.log("findAll::::", findAll);
            return findAll;
        } catch (e) {
            throw new Error(e);
        }
    }
    async findMain({ id, sql }) {
        try {
            const query = `SELECT 
      A.id,
      A.userid, 
      A.subject, 
      A.introduce,
      A.createdAt, 
      A.hit,
      A.image,
      A.category,
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
      ${sql}
      Where A.userid = '${id}'
      GROUP BY A.id
      ORDER BY A.id DESC;`;
            const [findAll] = await this.sequelize.query(query);
            // console.log(findAll);
            return findAll;
        } catch (e) {
            throw new Error(e);
        }
    }
    async findOne(id, idx) {
        try {
            const [view] = await this.findAll({ searchType: "A.id", search: idx });
            // const comment = await this.Comment.findAll({
            //     raw: true,
            //     where: { boardid: idx },
            // });
            const [comment] = await this.sequelize.query(`
            WITH RECURSIVE comments (id, content, depth, parentid, createdAt, updatedAt, boardid, userid, PATH) AS (
              SELECT id, content, depth, parentid, createdAt, updatedAt, boardid, userid, id
              FROM Comment
              WHERE parentid = 0
              UNION ALL
              SELECT t.id, t.content, comments.depth + 1, t.parentid, t.createdAt, t.updatedAt, t.boardid, t.userid, PATH
              FROM comments
              JOIN Comment t ON comments.id = t.parentid
            )
            SELECT *
            FROM comments
            WHERE boardid = ${idx}
            ORDER BY PATH`);
            // console.log(comment);
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
    async createBoard(boarddata) {
        console.log(`boarddata::::`, boarddata);
        try {
            const { userid, subject, content, hashtag, category, introduce, image } = boarddata;
            const createBoard = await this.Board.create(boarddata, { plain: true });
            const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
            const tagResult = await Promise.all(addHash);
            await createBoard.addHashes(tagResult.map((v) => v[0]));
            const temp = await this.Temp.findOne({ raw: true, where: { userid } });
            await this.Temp.destroy({ where: { userid } });
            const boardid = createBoard.dataValues.id;
            await this.PointUp.findOrCreate({ where: { userid, boardid, comment: "0" } });
            return createBoard.dataValues;
        } catch (e) {
            throw new Error(e);
        }
    }
    async createTemp(boarddata) {
        try {
            let result = await this.Temp.findOrCreate({ where: { userid: boarddata.userid } });
            if (result) await this.Temp.update(boarddata, { where: { userid: boarddata.userid } });
            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateBoard({ id, subject, content, hashtag, category, introduce }) {
        console.log("update :", id, subject, content, hashtag, category, introduce);
        try {
            const updateBoard = await this.Board.update(
                {
                    subject: subject,
                    content: content,
                },
                { where: { id: id } }
            );
            if (hashtag[0]) {
                const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }));
                await this.Hashtag.destroy({ where: { boardid: id } });
                const addHashTag = hashtag.map((tagname) => this.Hashtag.create({ boardid: id, tagname }));
                await Promise.all(addHash, addHashTag);
            }

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

    async getMyAttention(userid) {
        const sql = `SELECT 
            (SELECT COUNT(*) 
            FROM Liked 
            WHERE boardid IN( SELECT id FROM Board WHERE userid='${userid}')
            ) AS likes, 
            (SELECT COUNT(*) 
            FROM Comment 
            WHERE boardid IN( SELECT id FROM Board WHERE userid='${userid}')) 
            AS comment, 
            SUM(hit) 
            AS view 
            FROM board 
            where userid='${userid}';`;

        const result = await this.sequelize.query(sql);
        console.log("result:::::", result);
        return result;
    }

    async updatehit(id) {
        try {
            await this.Board.increment({ hit: 1 }, { where: { id: id } });
        } catch (e) {
            throw new Error(e);
        }
    }

    async tempCheck(userid) {
        try {
            const respone = await this.Temp.findOne({ raw: true, where: { userid } });
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async tempDestroy(userid) {
        try {
            const respone = await this.Temp.destroy({ raw: true, where: { userid } });
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async createPoint(data) {
        try {
            const respone = await this.PointUp.create(data);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = BoardRepository;

