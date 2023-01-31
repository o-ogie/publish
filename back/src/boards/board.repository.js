class BoardRepository {
  constructor({ User, Board, Comment, Liked, Hash, Hashtag, sequelize }) {
    this.User = User;
    this.Board = Board;
    this.Comment = Comment;
    this.Liked = Liked;
    this.Hash = Hash;
    this.Hashtag = Hashtag;
    this.sequelize = sequelize;
  }
  // async findAll() {
  //   try {
  //     const findAll = await this.Board.findAll({
  //       attributes: [
  //         "id",
  //         "userid",
  //         "subject",
  //         "createdAt",
  //         "hit",
  //         [
  //           this.sequelize.fn("COUNT", this.sequelize.col("Comments.boardid")),
  //           "commentCount",
  //         ],
  //         // [
  //         //   this.sequelize.fn("COUNT", this.sequelize.col("Liked.boardid")),
  //         //   "likeCount",
  //         // ],
  //       ],
  //       include: [
  //         {
  //           model: this.User,
  //           attributes: ["username"],
  //         },
  //         {
  //           model: this.Comment,
  //           attributes: [],
  //         },
  //         // {
  //         //   model: this.Liked,
  //         //   attributes: ["userid"],
  //         // },
  //       ],
  //       group: ["Board.id"],
  //       order: [["id", "DESC"]],
  //     });

  //     return findAll;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
  async findAll() {
    try {
      const query = `SELECT 
      A.id,
      A.userid, 
      B.username, 
      A.subject, 
      A.createdAt, 
      A.hit, 
      (SELECT COUNT(boardid) FROM Comment WHERE boardid = A.id) AS commentCount, 
      (SELECT COUNT(BoardId) FROM Liked WHERE BoardId = A.id) AS likeCount 
      FROM Board AS A 
      JOIN User AS B 
      ON A.userid = B.userid 
      ORDER BY A.id DESC;`
      const [findAll] = await this.sequelize.query(query);
      return findAll;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id) {
    try {
      const view = await this.Board.findOne({
        where: { id: id },
      });
      const comments = await view.getComments({ raw: true });
      const liked = await this.Liked.findAll({
        attributes: ['userid'],
        where: { boardid: id },
      });
      const hashtag = await this.Hashtag.findAll({
        attributes: ['tagname'],
        where: { boardid: id },
      });
      return { view: view, comments: comments, liked: liked, hashtag: hashtag };
    } catch (e) {
      throw new Error(e);
    }
  }
  async createBoard(writeData) {
    try {
      const createBoard = await this.Board.create(writeData);
      const addHash = writeData.hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }))
      const tagResult = await Promise.all(addHash)
      // console.log(tagResult)
      // console.log(createBoard.__proto__)
      await createBoard.addHashes(tagResult.map(v=>v[0])) 
      return createBoard;
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
      const addHash = hashtag.map((tagname) => this.Hash.findOrCreate({ where: { tagname } }))
      await this.Hashtag.destroy({ where: { boardid: id } });
      const addHashTag = hashtag.map((tagname) => this.Hashtag.create({ boardid: id, tagname }));
      await Promise.all(addHash, addHashTag)
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
      return create;
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

  async createLike(likeData) {
    console.log("repo :", likeData);
    try {
      const create = await this.Liked.create({
        BoardId: likeData.boardid,
        userid: likeData.userid,
      });
      return create;
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
}

module.exports = BoardRepository;
