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
            await this.forumRepository.post(data);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = forumService;

