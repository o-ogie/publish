const app = require("./app.js");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;
const SocketIO = require("./socket.io");
console.log(config);

const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false });

    // await sequelize.models.Category.create({ category: "food" });
    // await sequelize.models.Category.create({ category: "tech" });
    // await sequelize.models.Category.create({ category: "default" });
    // await sequelize.models.Category.create({ category: "travel" });
    // await sequelize.models.Category.create({ category: "life" });
    // for (let i = 0; i < 30; i++) {
    //     await sequelize.models.Board.create({ userid: "qjel216", subject: `test${i}`, content: "test", category: "default" });
    // }

    console.log(`backend server listening on port ${PORT}`);
});

SocketIO(server, app);

