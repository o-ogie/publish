const app = require("./app.js");
const { sequelize } = require("./models");
const config = require("./config");
const PORT = config.port;
const SocketIO = require("./socket.io");
const HttpException = require("./exceptions/BadRequest");
console.log(config);

// app.use((error, req, res, next) => {
//     if (error instanceof HttpException) {
//         res.json({
//             isError: true,
//             message: error.message,
//             status: error.status,
//         });
//     } else if (error instanceof Error) {
//         res.json({
//             isError: true,
//             message: error.message,
//         });
//     }
// });

const server = app.listen(PORT, async () => {
    await sequelize.sync({ force: false });

    // await sequelize.models.Category.create({ category: "food" });
    // await sequelize.models.Category.create({ category: "tech" });
    // await sequelize.models.Category.create({ category: "default" });
    // await sequelize.models.Category.create({ category: "travel" });
    // await sequelize.models.Category.create({ category: "life" });
    // await sequelize.models.Category.create({ category: "notice" });
    // await sequelize.models.Category.create({ category: "QnA" });
    // await sequelize.models.Board.create({ userid: "web7722", subject: `QnA`, content: "<div>test</div>", category: "QnA", introduce: "", state: "public" });

    for (let i = 0; i < 30; i++) {
        await sequelize.models.Board.create({ userid: "web7722", subject: `test${i}`, content: "<div>test</div>", category: "food", introduce: "", state: "public" });
    }

    console.log(`backend server listening on port ${PORT}`);
});

SocketIO(server, app);

