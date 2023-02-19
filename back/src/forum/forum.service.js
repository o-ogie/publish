class forumService {
    constructor({ forumRepository }) {
        this.forumRepository = forumRepository;
    }

    async getlist({ userid, level }) {
        try {
            if (level === "admin") userid = null;
            const [list, comment] = await this.forumRepository.getnotice({ userid, level });
            return [list, comment];
        } catch (e) {
            throw new Error(e);
        }
    }

    async postQ(data) {
        try {
            let { parentid, content, userid } = data;
            if (!parentid) parentid = 0;
            const respone = await this.forumRepository.post({ parentid, content, userid });
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async putQna({ commentidx, body }) {
        try {
            console.log(commentidx, body);
            const respone = await this.forumRepository.update({ commentidx, body });
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }

    async delQna(commentidx) {
        try {
            const respone = await this.forumRepository.deleteQ(commentidx);
            return respone;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = forumService;

