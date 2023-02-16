class forumService {
    constructor({ forumRepository }) {
        this.forumRepository = forumRepository;
    }

    async getlist() {
        try {
            const [list, comment] = await this.forumRepository.getnotice();
            return [list, comment];
        } catch (e) {
            throw new Error(e);
        }
    }

    async postQ(data) {
        try {
            let { parentid, comment, userid } = data;
            if (!parentid) parentid = 0;
            await this.forumRepository.post({ parentid, comment, userid });
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = forumService;

