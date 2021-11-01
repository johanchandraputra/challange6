const express = require("express");
const models = require("../../models");

const historiesRouter = express.Router();

function historiesSet(user) {
    console.log(user);
    return {
        id: user.id,
        user_id: user.user_id,
        score: user.score,
        time: user.time,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

historiesRouter.get("/", async (req, res) => {
    try {
        const users = await models.user_histories.findAll();
        const previewHistories = users.map((user) => historiesSet(user));
        res.json(previewHistories);
    } catch (err) {
        res.status(500).json(err);
    }
});

historiesRouter.get("/:id", async (req, res) => {
    try {
        const user = await models.user_histories.findByPk(req.params.id);
        if (user === null) {
            res.status(404).json({ message: "Histories has not found" });
            return;
        }
        res.json(historiesSet(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

historiesRouter.post("/", async (req, res) => {
    try {
        const user = await models.user_histories.create({
            user_id: req.body.id,
            score: req.body.score,
            time: req.body.time,
        });
        res.json(historiesSet(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

historiesRouter.patch("/:id", async (req, res) => {
    try {
        await models.user_histories.update(
            {fullname: req.body.fullname },
            {where:{user_id : req.params.id}}
        );
        res.json({ message: "fullname has been updated" });
    } catch (err) {
        res.status(500).json(err);
    }
});

historiesRouter.delete("/:id", async (req, res) => {
    try {
        await models.user_histories.destroy({ where: { id: req.params.id } });
        res.json({ message: "Data has been deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = historiesRouter;