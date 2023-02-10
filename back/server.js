const app = require("./app.js");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;
const SocketIO = require("./socket.io");
console.log(config);

const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false });
    console.log(`backend server listening on port ${PORT}`);
    // sequelize.models.Category.create({category:"tech"})
    // sequelize.models.Category.create({category:"food"})
    // sequelize.models.Category.create({category:"travel"})
    // sequelize.models.Category.create({category:"life"})
    // sequelize.models.Category.create({category:"default"})

});

SocketIO(server, app);

