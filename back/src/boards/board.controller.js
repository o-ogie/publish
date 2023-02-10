class BoardController {
    constructor({ boardService }) {
        this.boardService = boardService;
    }
    async getList(req, res, next) {
        try {
            console.log("req.body", req.body);
            const response = await this.boardService.getList(req.body);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
    async getMain(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.boardService.getMain(id);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
    async getFavor(req, res, next) {
        try {
            const { id } = req.params;
            const response = await this.boardService.getFavor(id);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
    async getView(req, res, next) {
        try {
            const { id, idx, userid } = req.params;
            const response = await this.boardService.getView(id, idx, userid);
            res.json(response);
        } catch (e) {
            next(e);
        }
    }
    async postWrite(req, res, next) {
        try {
            if (!req.body.subject) throw new Error("제목이 없습니다");
            if (!req.body.content) throw new Error("내용이 없습니다");
            const { userid, subject, content, hashtag, category, introduce } = req.body;
            const response = await this.boardService.postWrite({
                userid,
                subject,
                content,
                category,
                introduce,
                hashtag,
            });
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    async postTemp(req, res, next) {
        try {
            const { userid, subject, content } = req.body;
            const response = await this.boardService.postTemp({
                userid,
                subject,
                content,
            });
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    async putView(req, res, next) {
        console.log(`putCon:`, req.params.idx, req.body.subject, req.body.content, req.body.hashtag, req.body.category, req.body.introduce);
        try {
            if (!req.body.subject) throw new Error("제목을 입력해주세요");
            if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
            const response = await this.boardService.putView(req.params.idx, req.body.subject, req.body.content, req.body.hashtag, req.body.category, req.body.introduce );
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    async deleteView(req, res, next) {
        try {
            // if (!req.params.id) throw new Error("삭제할 글이 없습니다");
            const response = await this.boardService.deleteView(req.params.idx);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    async postComment(req, res, next) {
        console.log(`postCon:`, req.params.idx, req.body);
        try {
            if (!req.body.userid) throw new Error("작성자가 없습니다");
            if (!req.body.content) throw new Error("내용이 없습니다");

            const response = await this.boardService.postComment(req.params.idx, req.body);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    async putComment(req, res, next) {
        console.log(`putCon:`, req.params.idx, req.body.content);
        try {
            if (!req.body.content) throw new Error("수정할 내용을 입력해주세요");
            const response = await this.boardService.putComment(req.params.idx, req.body.content);
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
        console.log(`postCon:`, req.params.idx, req.body.userid);
        try {
            const [count, check] = await this.boardService.postLike(req.params.idx, req.body.userid);
            res.status(201).json({ count, check });
        } catch (e) {
            next(e);
        }
    }
    async deleteLike(req, res, next) {
        console.log(`postCon:`, req.params.id, req.body.userid);
        try {
            const response = await this.boardService.deleteLike(req.params.id, req.body.userid);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }

    async decode(req, res, next) {
        try {
            const { payload } = req.body;
            const userdata = await this.boardService.decoded(payload);
            res.json(userdata);
        } catch (e) {
            next(e);
        }
    }

    async getcheck(req, res, next) {
        try {
            const { id: userid, idx: boardid } = req.params;
            const data = await this.boardService.checked({ userid, boardid });
            res.json(data);
        } catch (e) {}
    }

    async attention(req,res,next){
        try{
            const {userid} = req.params
            console.log('userid:::::::::::::::::',userid)
            const response = await this.boardService.profile(userid)
            res.json(response)
        }catch(e){
            next(e)
        }
    }
}

module.exports = BoardController;

