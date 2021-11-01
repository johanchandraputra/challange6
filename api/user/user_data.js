const express = require("express");
const models = require("../../models");

const userRouter = express.Router();

function userSet(user) {
    return {
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

userRouter.get("/", async (req, res) => {
    try {
        const users = await models.users.findAll();
        const previewUser = users.map((user) => userSet(user));
        res.json(previewUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const user = await models.users.findByPk(req.params.id);
        if (user === null) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(userSet(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

userRouter.post("/", async (req, res) => {
    // let transaction;
    try {
        // transaction = await models.sequelize.transaction();
        const user = await models.users.create({
            username: req.body.username,
            password: req.body.password,
        });

        // ketika username dibuat, otomatis id biodata juga akan terbuat,
        // sehingga memudahkan admin supaya tidak melakukan input data 2 kali, 
        // hanya perlu melakukan update saja untuk melengkapi data .
        await models.user_biodata.create({
            user_id: user.id
        });
        // await transaction.commit();
        res.json(userSet(user));
    } catch (err) {
        console.error(err);
        // if (transaction) await transaction.rollback();
        res.status(500).json(err);
    }
});

userRouter.delete("/:id", async (req, res) => {
    try {
        await models.users.destroy({ where: { id: req.params.id } });
        res.json({ message: "Username has been deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});


// admin tidak berhak melakukan update username maupun password

module.exports = userRouter;