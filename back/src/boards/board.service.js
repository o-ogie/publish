class BoardService {
    constructor({ boardRepository, config, jwt }) {
        this.boardRepository = boardRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
        this.jwt = jwt;
    }

    async getList() {
        try {
            const list = await this.boardRepository.findAll();
            if (list.length === 0) throw "내용이 없습니다";
            return list;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getView(id, idx) {
        try {
            const [view, comment] = await this.boardRepository.findOne(id, idx);
            let { userImg: test } = view;
            if (test.indexOf("http") === -1) {
                test = `http://localhost:3000/${test}`;
            }
            const data = { ...view, userImg: test };
            return [data, comment];
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async postWrite({ userid, subject, content, hashtag }) {
        console.log(`serv :`, { userid, subject, content, hashtag });
        try {
            if (!userid || !subject || !content) throw "내용이 없습니다";
            const write = await this.boardRepository.createBoard({ userid, subject, content, hashtag });
            return write;
        } catch (e) {
            // throw new this.BadRequest(e);
        }
    }
    async putView(id, subject, content, hashtag) {
        console.log(`serv :`, { id, subject, content, hashtag });
        try {
            const view = await this.boardRepository.updateBoard({ id, subject, content, hashtag });
            if (view < 1) throw "수정할 게시글이 없습니다";
            return view;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteView(id) {
        // console.log(`serv :`, id);
        try {
            const view = await this.boardRepository.destroyBoard(id);
            if (view < 1) throw "삭제할 게시글이 없습니다";
            return view;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postComment(boardid, comment) {
        // console.log(`serv :`, { boardid, comment });
        try {
            if (!boardid || !comment.userid || !comment.content) throw "내용이 없습니다";
            if (!comment.group) comment.group = boardid;
            const data = {
                boardid,
                ...comment,
            };

            const write = await this.boardRepository.createComment(data);
            console.log(`serv :`, { write });
            return write;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async putComment(id, content) {
        console.log(`serv :`, { id, content });
        try {
            const comment = await this.boardRepository.updateComment({ id, content });
            if (comment < 1) throw "수정할 댓글이 없습니다";
            return comment;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteComment(id) {
        // console.log(`serv :`, id);
        try {
            const comment = await this.boardRepository.destroyComment(id);
            if (comment < 1) throw "삭제할 댓글이 없습니다";
            return comment;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postLike(boardid, userid) {
        console.log(`serv :`, { boardid, userid });
        try {
            if (!boardid || !userid) throw "추천 실패";
            const [count, check] = await this.boardRepository.createLike({ boardid, userid });
            return [count, check];
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteLike(boardid, userid) {
        // console.log(`serv :`, { boardid, userid, content });
        try {
            if (!boardid || !userid) throw "추천 취소 실패";
            const remove = await this.boardRepository.destroyLike({ boardid, userid });
            return remove;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async decoded(payload) {
        try {
            const user = this.jwt.decode(payload);
            return user;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async checked({ userid, boardid }) {
        try {
            const checkdata = this.boardRepository.likecheck({ userid, boardid });
            return checkdata;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = BoardService;

