import CommentRequest from "/js/module/board/comment.request";

class Comment {
    state;
    constructor(request) {
        this.request = request;
    }

    render() {}

    async setup(id, idx) {
        const respone = await this.request.findAll(`boards/@${id}/${idx}`);
        const [view, comment] = respone.data;
        this.state = comment;
    }

    templete() {}

    addEvent() {
        const El = document.querySelector(elment);
        addEventListener(motion, callback);
    }

    setstatus(newstate) {
        if (this.state === newstate) return;
        this.state = newstate;
    }
}

export default new Comment(CommentRequest);

