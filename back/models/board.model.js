module.exports = (sequelize, Sequelize) => {
  class Board extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          subject: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          image: {
            type: Sequelize.TEXT(),
            allowNull: false,
            defaultValue: "http://localhost:3000/board/default-board.png",
          },
          hit: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          introduce: {
            type: Sequelize.STRING(255),
            allowNull: true,
          },
          state: {
            type: Sequelize.ENUM("blind", "temp", "public"),
            allowNull: false,
          }
        },
        {
          sequelize,
          timestamp: true,
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userid",
      });
      this.belongsTo(models.Category, {
        foreignKey: "category",
      });
      this.hasMany(models.Comment, {
        foreignKey: "boardid",
      });
      this.hasMany(models.PointUp, {
        foreignKey: "boardid",
      });
      this.belongsToMany(models.User, {
        through: "Liked",
        foreignKey: "boardid",
      });
      this.belongsToMany(models.Hash, {
        through: "Hashtag",
        foreignKey: "boardid",
      });
    }
  }
  Board.createTable();
};
