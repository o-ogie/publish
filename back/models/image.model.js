module.exports = (sequelize, Sequelize) => {
  class BoardImage extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          image: {
            type: Sequelize.TEXT(),
            allowNull: false,
            defaultValue: "",
          },
        },
        {
          sequelize,
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: "boardid",
      });
    }
  }
  BoardImage.createTable();
};
