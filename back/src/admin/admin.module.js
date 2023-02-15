const {
    sequelize,
    sequelize: {
        models: { User, Board },
    },
} = require("../../models");

const AdminRepository = require("./admin.repository");
const AdminService = require("./admin.service");
const AdminController = require("./admin.controller");
const config = require("../../config");

const JWT = require("../../lib/jwt");
const crypto = require("crypto");

const jwt = new JWT({ crypto, SALT:config.SALT });
const adminRepository = new AdminRepository({ sequelize, User, Board });
const adminService = new AdminService({ adminRepository, jwt, config });
const adminController = new AdminController({ adminService });

module.exports = {
    adminController,
    jwt
};

