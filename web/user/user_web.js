const express = require("express");
const models = require("../../models");

const router = express.Router();

function userSet(user) {
    return {
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

async function createUser(user) {
    try {
        const users = await models.users.create({
            username : user.username,
            password : user.password,
        });
        return userSet(users); 
    } catch (err) {
        console.log(err);
    }
}

router.get("/", async (req, res) => {
    const users = await models.users.findAll();
    res.render("./adm_homepage", {
        users,
    })
});


router.post("/", async (req, res) => {
   const user = await createUser(req.body);
   const users = await models.users.findAll();
    res.render("./adm_homepage", {
        users,
    })
});


router.delete("/:id", async (req, res) => {
    try {
        await models.users.destroy({ where: { id: req.params.id } });
        res.json({ message: "Data has been deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;