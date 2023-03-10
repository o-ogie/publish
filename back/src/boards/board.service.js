class BoardService {
    constructor({ boardRepository, config, jwt }) {
        this.boardRepository = boardRepository;
        this.config = config;
        this.BadRequest = config.exception.BadRequest;
        this.jwt = jwt;
        this.viewObj = new Object();
    }

    async getList({ searchType, search, sort, category }, { count, sort: pagingsort, category: pagingcategory }) {
        try {
            console.log("scht, sch, srt", searchType, search, sort, count, pagingsort, pagingcategory);
            if (category === `default`) category = ``;
            if (pagingcategory === `default`) pagingcategory = ``;
            const views = 9;
            if (!count) count = 0;
            let limitval = views * count;
            const limit = {
                limit: limitval,
                views,
            };
            const data = await this.boardRepository.findAll({ searchType, search, sort, category, limit, pagingsort, pagingcategory });
            const list = data.filter((v) => v.category !== "notice" && v.category !== "QnA");
            // if (list.length === 0) throw "내용이 없습니다";
            // console.log("serv", list);
            return list;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getMain(id) {
        try {
            id = { id: `A.userid = '${id}'`, sql: ``, order: `A.id` };
            const main = await this.boardRepository.findMain(id);
            if (main) {
                const tags = main
                    .map((v) => v.tagname)
                    .join(", ")
                    .split(", ");
                const countTags = tags.reduce((acc, tag) => {
                    acc[tag] = (acc[tag] || 0) + 1;
                    return acc;
                }, {});
                console.log(`main:::`, { main: main, tagnames: countTags });

                return { main: main, tagnames: countTags };
            }
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getFavor(id) {
        console.log(`id:::`, id);
        try {
            const data = { id: `D.userid = '${id}'`, sql: `JOIN Liked AS D ON A.id = D.boardid `, order: `D.createdAt` };
            console.log(`data ::::`, data);
            const favor = await this.boardRepository.findMain(data);
            console.log(`favor ::::`, favor);
            return favor;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getHistory(id) {
        try {
            const data = { id: `D.userid = '${id}'`, sql: `JOIN History AS D ON A.id = D.boardid`, order: `D.createdAt` };
            console.log(`data ::::`, data);
            const history = await this.boardRepository.findMain(data);
            console.log(`history ::::`, history);
            return history;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async getView(id, idx, userid) {
        try {
            console.log(`view::::`, id, idx, userid);
            const currentState = await this.boardRepository.getState(idx);
            if (currentState === "blind") {
                console.log("current state:::", currentState);
                throw new Error("차단된 게시글입니다");
            }
            if (userid !== "null") {
                if (!this.viewObj["hit"]) this.viewObj["hit"] = [];
                if (this.viewObj["hit"].indexOf(`${userid}+${idx}`) === -1 && id !== userid) {
                    this.viewObj["hit"].push(`${userid}+${idx}`);
                    await this.boardRepository.updatehit(idx);
                }
                console.log(this.viewObj["hit"]);
                setTimeout(() => {
                    this.viewObj["hit"].splice(this.viewObj["hit"].indexOf(`${userid}+${idx}`), 1);
                }, 200000);
            }
            if (userid !== "null" && userid !== "guest") await this.boardRepository.updatehistory(userid, idx);

            const [view, prevPost, nextPost, comment] = await this.boardRepository.findOne(id, idx);
            let { userImg: test } = view;
            if (test.indexOf("http") === -1) {
                test = `http://${config.host}:${config.IMGPORT}/${test}`;
            }
            const data = { ...view, prevPost, nextPost, userImg: test };
            return [data, comment];
        } catch (e) {
            console.error(e);
        }
    }
    async postWrite({ userid, subject, content, hashtag, category, introduce }) {
        console.log(`serv :`, { userid, subject, content, hashtag, category, introduce });
        try {
            if (!userid || !subject || !content) throw "내용이 없습니다";
            const regex = /https?:\/\/[^\s]*?\.(?:png|jpe?g|gif)/g;
            const match = regex.exec(content);

            let imgs = null;
            if (match) {
                imgs = match;
            } else {
                imgs = content
                    .split(`img src="`)
                    .filter((v) => v.indexOf("http") !== -1)
                    .map((v) => v.split(`"&gt`)[0]);
            }
            const boarddata = {
                userid,
                subject,
                content,
                hashtag,
                category,
                introduce,
                image: imgs[0],
            };

            if (!imgs[0]) delete boarddata.image;

            const write = await this.boardRepository.createBoard(boarddata);
            return write;
        } catch (e) {
            // throw new this.BadRequest(e);
        }
    }
    async postTemp({ userid, subject, content }) {
        console.log(`serv :`, { userid, subject, content });
        try {
            const imgs = content
                .split("img src=")
                .filter((v) => v.indexOf("http") !== -1)
                .map((v) => v.split("&gt")[0]);
            const boarddata = {
                userid,
                subject,
                content,
                image: imgs[0],
            };
            if (!imgs[0]) delete boarddata.image;
            const temp = await this.boardRepository.createTemp(boarddata);
            return temp;
        } catch (e) {
            // throw new this.BadRequest(e);
        }
    }
    async postState(id) {
        try {
            let state = "";
            const currentState = await this.boardRepository.getState(id);
            if (currentState === "blind") {
                state = "public";
            } else {
                state = "blind";
            }
            await this.boardRepository.updateState(id, state);
            return state;
        } catch (e) {
            // throw new this.BadRequest(e);
        }
    }
    async putView(putdata) {
        console.log(`serv :`, putdata);
        try {
            const { id, subject, content, hashtag, category, introduce, userid } = putdata;
            console.log(id === "temp");
            if (id === "temp") {
                if (!userid || !subject || !content) throw "내용이 없습니다";
                const imgs = content
                    .split("img src=")
                    .filter((v) => v.indexOf("http") !== -1)
                    .map((v) => v.split("&gt")[0]);
                const boarddata = {
                    userid,
                    subject,
                    content,
                    hashtag,
                    category,
                    introduce,
                    image: imgs[0],
                };
                if (!imgs[0]) delete boarddata.image;
                const view = await this.boardRepository.createBoard(boarddata);
                await this.boardRepository.tempDestroy(userid);
                return view;
            } else {
                const view = await this.boardRepository.updateBoard({ id, subject, content, hashtag, category, introduce });

                if (view < 1) throw "수정할 게시글이 없습니다";
                return view;
            }
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
    async deleteView(idx) {
        // console.log(`serv :`, id);
        try {
            const view = await this.boardRepository.destroyBoard(idx);
            if (view < 1) throw "삭제할 게시글이 없습니다";
            return view;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async postComment(boardid, comment) {
        console.log(`serv :`, { boardid, comment });
        try {
            let { userid, parentid, content, boardWirterid } = comment;
            if (!boardid || !comment.userid || !comment.content) throw "내용이 없습니다";
            if (!parentid) parentid = 0;
            const data = {
                boardid,
                parentid,
                userid,
                content,
            };
            const write = await this.boardRepository.createComment(data);
            console.log("write", write);

            if (parentid === 0 && userid !== boardWirterid) {
                let point = { boardid, userid: boardWirterid, comment: "1", commentid: write.id };
                const pointrespone = await this.boardRepository.createPoint(point);
                return point;
            } else if (parentid > 0 && userid !== comment.pointUp) {
                let point = { boardid, userid: comment.pointUp, comment: "1", commentid: write.id };
                const pointrespone = await this.boardRepository.createPoint(point);
                return point;
            } else {
                return write;
            }
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

    async likechecked({ userid, boardid }) {
        try {
            const checkdata = this.boardRepository.likecheck({ userid, boardid });
            return checkdata;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async checkTemp(userid) {
        try {
            const checked = this.boardRepository.tempCheck(userid);
            console.log(checked);
            return checked;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async deleteTemp(userid) {
        try {
            await this.boardRepository.tempDestroy(userid);
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }

    async profile(userid) {
        try {
            const [[response]] = await this.boardRepository.getMyAttention(userid);
            return response;
        } catch (e) {
            throw new this.BadRequest(e);
        }
    }
}

module.exports = BoardService;

