import request from "/js/lib/request.js";

class CommentRequest {
    constructor(request) {
        this.request = request;
    }

    async create(body) {
        try {
            if (!body) throw "내용이 없습니다.";
            await this.request.post("/:id/:idx/comment", body);
        } catch (e) {
            throw new Error(e);
        }
    }

    async find() {
        try {
            const comments = await this.request.get("/:id:/:idx");
            return comments;
        } catch (e) {
            throw new Error(e);
        }
    }

    async update(body) {
        try {
            const respone = await this.request.put("/:id/:idx/comment/:cid", body);
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async destroy() {
        try {
            const respone = await this.request.destroy("/:id/:idx/comment/:cid");
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new CommentRequest(request);

