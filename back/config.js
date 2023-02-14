require("dotenv").config();
const BadRequest = require("./exceptions/BadRequest");

const config = {
  exception: {
    BadRequest,
  },
  SALT: process.env.SALT || 'web7722',
  mailer: {
    user: process.env.MAIL_USER || "",
    password: process.env.MAIL_USERPW || "",
  },
  host: process.env.HOST || "127.0.0.1",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "3000",
  redirect_host: process.env.REDIRECT_HOST || 'localhost',
  redirect_port: process.env.REDIRECT_PORT || '3005',
  db: {
    development: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      port: process.env.DB_PORT || "",
      host: process.env.DB_HOST || "",
      dialect: "mysql",
      timezone: "Asia/Seoul",
      dialectOptions: {
        dataStrings: true,
        typeCast:true,
      },
      define: { freezeTableName: true, timestamp: false },
    },
    test: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      port: process.env.DB_PORT || "",
      host: process.env.DB_HOST || "",
      dialect: "mysql",
      logging: false,
    },
  },
};

module.exports = config;

