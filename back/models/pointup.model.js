module.exports = (sequelize, Sequelize) => {
  class PointUp extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          userid: {
            type: Sequelize.STRING(16),
            primaryKey: true,
          },
          boardid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          comment: {
            type: Sequelize.ENUM('0','1'),
            primaryKey: true,
          },
          commentid: {
            type: Sequelize.INTEGER,
          },
        },
        {
          sequelize,
          timestamps: true,
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userid",
      });
      this.belongsTo(models.Board, {
        foreignKey: "boardid",
      });
      this.belongsTo(models.Comment, {
        foreignKey: "commentid",
      });
    }
  }
  PointUp.createTable();
};
