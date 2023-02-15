class forumService {
    constructor({ forumRepository }) {
        this.forumRepository = forumRepository;
    }

    async getlist() {
        try {
            console.log("hihihihi");
            const list = await this.forumRepository.getnotice();
            return list;
        } catch (e) {}
    }
}

module.exports = forumService;

