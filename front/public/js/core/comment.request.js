class CommentRequest {
    constructor(request) {
        this.request = request;
    }

    async create(path, body) {
        try {
            if (!body) throw "내용이 없습니다.";
            await this.request.post(path, body);
        } catch (e) {
            throw new Error(e);
        }
    }

    async findAll(path) {
        try {
            const comments = await this.request.get(path);
            return comments;
        } catch (e) {
            throw new Error(e);
        }
    }

    async update(path, body) {
        try {
            const respone = await this.request.put(path, body);
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async destroy(path) {
        try {
            const respone = await this.request.destroy(path);
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default CommentRequest;

