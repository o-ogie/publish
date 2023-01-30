module.exports = (sequelize, Sequelize) => {
    class Introduce extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            introduce: {
              type: Sequelize.TEXT(),
              allowNull: true,
            },
          },
          {
            sequelize,
          }
        );
      }
      static associate(models) {
        this.belongsTo(models.User, {
          foreignKey: "userid",
        });
      }
    }
    Introduce.createTable();
  };
  