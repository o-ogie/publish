const app = require("./app.js");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;
const SocketIO = require("./socket.io");
console.log(config);

const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false });
    console.log(`backend server listening on port ${PORT}`);
});

SocketIO(server, app);

