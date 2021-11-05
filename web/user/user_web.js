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
        mode:"Create" ,
        username: null,
        id:null,
    })
});

router.get("/:id", async (req, res) => {
    const users = await models.users.findAll();
    res.render("./adm_homepage", {
        users,
        mode:"Update" ,
        username: req.query.username,
        id:req.params.id,
    })
});


router.post("/", async (req, res) => {
   const user = await createUser(req.body);
   const users = await models.users.findAll();
    res.render("./adm_homepage", {
        users,
        mode:"Create",
        username: null,
        id:null,
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


router.patch("/:id", async (req, res) => {
    try {
       await models.users.update(
            {username: req.body.username},
            {where:{id : req.params.id}}
        );
        res.json({ message: "Data has been updated" });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;