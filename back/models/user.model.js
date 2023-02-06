module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    userid: {
                        type: Sequelize.STRING(16),
                        primaryKey: true,
                        validate: {
                            is: /^[A-Za-z0-9]{6,16}$/,
                        },
                    },
                    username: {
                        type: Sequelize.STRING(16),
                        allowNull: false,
                        validate: {
                            is: /^[A-Za-z가-힣]{2,16}$/,
                        },
                    },
                    nickname: {
                        type: Sequelize.STRING(16),
                        allowNull: false,
                        validate: {
                            is: /^[A-Za-z가-힣0-9]{2,16}$/,
                        },
                    },
                    userpw: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    gender: {
                        type: Sequelize.ENUM("male", "female"),
                        defaultValue: "male",
                        allowNull: false,
                    },
                    phoneNumber: {
                        type: Sequelize.STRING(11),
                        validate: {
                            is: /^010[0-9]{8}$/,
                        },
                    },
                    email: {
                        type: Sequelize.STRING(30),
                        validate: {
                            isEmail: true,
                        },
                    },
                    userImg: {
                        type: Sequelize.TEXT(),
                        allowNull: false,
                        defaultValue: "",
                    },
                    provider: {
                        type: Sequelize.ENUM("local", "kakao"),
                        allowNull: false,
                        defaultValue: "local",
                    },
                    snsId: {
                        type: Sequelize.STRING(30),
                        allowNull: true,
                    },
                    introduce: {
                        type: Sequelize.TEXT(),
                        allowNull: true,
                    },
                },
                {
                    sequelize,
                    timestamp: true,
                }
            );
        }
        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: "userid",
            });
            this.hasMany(models.Comment, {
                foreignKey: "userid",
            });
            this.hasMany(models.PointUp, {
                foreignKey: "userid",
            });
            this.hasMany(models.Chat, {
                foreignKey: "nickname",
            });
            this.belongsToMany(models.Board, {
                through: "Liked",
                foreignKey: "userid",
            });
        }
    }
    User.createTable();
};

