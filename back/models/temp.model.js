const {host, port} = require('../config')
module.exports = (sequelize, Sequelize) => {
    class Temp extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            userid: {
                type: Sequelize.STRING(16),
                primaryKey: true,
            },
            subject: {
              type: Sequelize.STRING(100),
              allowNull: true,
            },
            content: {
              type: Sequelize.TEXT,
              allowNull: true,
            },
            image: {
              type: Sequelize.TEXT(),
              allowNull: true,
              defaultValue: `http://${host}:${port}/board/default-board.png`,
            },
          },
          {
            sequelize,
            timestamp: true,
          }
        );
      }
    }
    Temp.createTable();
  };
  