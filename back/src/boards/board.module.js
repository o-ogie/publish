const {
    sequelize: {
        models: { Board, Temp, Hashtag, Comment, User, Hash, Liked },
    },
    sequelize,
} = require("../../models/index");

const { Sequelize } = require("sequelize");
const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");
const JWT = require("../../lib/jwt");
const crypto = require("crypto");
const config = require("../../config");
console.log(config)

const jwt = new JWT({ crypto });

const repository = new BoardRepository({ sequelize, Board, Temp, Hashtag, Comment, User, Hash, Liked, Sequelize });
const service = new BoardService({ boardRepository: repository, config, jwt });
const controller = new BoardController({ boardService: service });

module.exports = {
    repository,
    service,
    controller,
};

