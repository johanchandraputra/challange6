const express = require("express");
const models = require("../../models");

const biodataRouter = express.Router();

function biodataSet(user) {
    return {
        id: user.id,
        user_id: user.user_id,
        fullname: user.fullname,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

biodataRouter.get("/", async (req, res) => {
    try {
        const users = await models.user_biodata.findAll();
        const previewBiodata = users.map((user) => biodataSet(user));
        res.json(previewBiodata);
    } catch (err) {
        res.status(500).json(err);
    }
});

biodataRouter.get("/:id", async (req, res) => {
    try {
        const user = await models.user_biodata.findByPk(req.params.id);
        if (user === null) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(biodataSet(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

// tidak perlu di lakukan, karena id_user sudah di buat ketika user membuat username, 
// hanya memerlukan update saya untuk melengkapi data nya. 
biodataRouter.post("/", async (req, res) => {
    try {
        const user = await models.user_biodata.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.json(biodataSet(user));
    } catch (err) {
        res.status(500).json(err);
    }
});

biodataRouter.patch("/:id", async (req, res) => {
    try {
        await models.user_biodata.update(
            {fullname: req.body.fullname },
            {where:{user_id : req.params.id}}
        );
        res.json({ message: "fullname has been updated" });
    } catch (err) {
        res.status(500).json(err);
    }
});

biodataRouter.delete("/:id", async (req, res) => {
    try {
        await models.user_biodata.destroy({ where: { id: req.params.id } });
        res.json({ message: "Data has been deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = biodataRouter;