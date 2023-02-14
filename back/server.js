const app = require("./app.js");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;
const SocketIO = require("./socket.io");
console.log(config);

const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: true });

    await sequelize.models.Category.create({ category: "food" });
    await sequelize.models.Category.create({ category: "tech" });
    await sequelize.models.Category.create({ category: "default" });
    await sequelize.models.Category.create({ category: "travel" });
    await sequelize.models.Category.create({ category: "life" });

    console.log(`backend server listening on port ${PORT}`);

});

SocketIO(server, app);

