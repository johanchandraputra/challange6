const express = require("express");
const userRouter = require("./api/user/user_data");
const biodataRouter = require("./api/user_biodata/user_biodata");
const historiesRouter = require('./api/user_histories/user_histories');

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/user_biodata", biodataRouter);
app.use("/api/user_histories", historiesRouter);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine","ejs");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
