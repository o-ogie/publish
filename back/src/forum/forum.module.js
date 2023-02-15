const {
    sequelize: { models },
} = require("../../models/index");

const Repository = require("./forum.repository");
const Service = require("./forum.service");
const Controller = require("./forum.controller");

const forumRepository = new Repository({ models });
const forumService = new Service({ forumRepository });
const controller = new Controller({ forumService });

module.exports = {
    controller,
};

