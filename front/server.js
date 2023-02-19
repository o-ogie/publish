const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const router = require("./routes");

app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
    // console.log(`req.cookies :`, req.cookies);
    try {
        const { token } = req.cookies;
        const [header, payload, signature] = token.split(".");

        const decodedPl = JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
        // console.log(`decodedPl :`,decodedPl);

        req.user = decodedPl;
    } catch (e) {
    } finally {
        next();
    }
});
app.use(router);

app.use((error, req, res, next) => {
    res.render("error.html", { error });
});

app.listen(80, () => {
    console.log(`front server listening on 3005`);
});

