const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("./public"));
app.use(express.json());


const userRouter = require("./api/user/user_data");
const biodataRouter = require("./api/user_biodata/user_biodata");
const historiesRouter = require('./api/user_histories/user_histories');
const route = require('./router/login');
const login = require("./src/login");
const userWeb = require("./web/user/user_web");

app.use("/api/user", userRouter);
app.use("/api/user_biodata", biodataRouter);
app.use("/api/user_histories", historiesRouter);
app.use("/", route);
app.post("/api/login", login);
app.use("/dashboard", userWeb);
app.use((req, res, next) => {
    if(req.url.startsWith("/api")){
        res.status(404).json({
            error:"not found"
        });
        return;
    }
    res.status(404).send("PAGE NOT FOUND");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
