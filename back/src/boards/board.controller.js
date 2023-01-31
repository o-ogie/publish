class BoardController {
  constructor({ boardService }) {
    this.boardService = boardService;
  }
  async getList(req, res, next) {
    try {
      const response = await this.boardService.getList();
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
  async getView(req, res, next) {
    try {
      const response = await this.boardService.getView(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
  async postWrite(req, res, next) {
    try {
      if (!req.body.subject) throw new Error("제목이 없습니다");
      if (!req.body.content) throw new Error("내용이 없습니다");
      req.body.userid = "web7722";
      const { userid, subject, content, hashtag } = req.body;
      console.log(`req.body :`, { userid, subject, content, hashtag });
      const response = await this.boardService.postWrite({
        userid,
        subject,
        content,
        hashtag,
      });
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  async putView(req, res, next) {
    console.log(`putCon:`, req.params.id, req.body.subject, req.body.content, req.body.hashtag);
    try {
      if (!req.body.subject) throw new Error("제목을 입력해주세요");
      if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
      const response = await this.boardService.putView(
        req.params.id,
        req.body.subject,
        req.body.content,
        req.body.hashtag
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  async deleteView(req, res, next) {
    try {
      // if (!req.params.id) throw new Error("삭제할 글이 없습니다");
      const response = await this.boardService.deleteView(req.params.id);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  async postComment(req, res, next) {
    console.log(`postCon:`, req.params.id, req.body.userid, req.body.content);
    try {
      if (!req.body.userid) throw new Error("작성자가 없습니다");
      if (!req.body.content) throw new Error("내용이 없습니다");
      const response = await this.boardService.postComment(
        req.params.id,
        req.body.userid,
        req.body.content
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  async putComment(req, res, next) {
    console.log(`putCon:`, req.params.idx, req.body.content);
    try {
      if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
      const response = await this.boardService.putComment(
        req.params.idx,
        req.body.content
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  async deleteComment(req, res, next) {
    try {
      const response = await this.boardService.deleteComment(req.params.idx);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  async postLike(req, res, next) {
    console.log(`postCon:`, req.params.id, req.body.userid);
    try {
      const response = await this.boardService.postLike(
        req.params.id,
        req.body.userid
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
  async deleteLike(req, res, next) {
    console.log(`postCon:`, req.params.id, req.body.userid);
    try {
      const response = await this.boardService.deleteLike(
        req.params.id,
        req.body.userid
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
