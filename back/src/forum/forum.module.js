const { sequelize } = require("../../models/index");
const { models } = sequelize;

const Repository = require("./forum.repository");
const Service = require("./forum.service");
const Controller = require("./forum.controller");

const forumRepository = new Repository({ sequelize, models });
const forumService = new Service({ forumRepository });
const controller = new Controller({ forumService });

module.exports = {
    controller,
};

