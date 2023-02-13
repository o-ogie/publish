module.exports = (sequelize, Sequelize) => {
    class PointUp extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    userid: {
                        type: Sequelize.STRING(16),
                    },
                    boardid: {
                        type: Sequelize.INTEGER,
                    },
                    comment: {
                        type: Sequelize.ENUM("0", "1"),
                        defaultValue: "0",
                    },
                    commentid: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
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

