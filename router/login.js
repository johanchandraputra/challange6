const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("login", { url:"/api/login"});
});


module.exports = router;