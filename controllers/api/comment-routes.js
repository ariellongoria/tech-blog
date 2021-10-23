const router = require("express").Router();
const { User, Comment, Post } = require("../../models");

router.get("/", (req, res) => {
    Comment.findall()
        .then((commentData) => res.json(commentData))
        .catch((err) => res.json(err));
});

router.post("/", ({ body }, res) => {
    Comment.create(body)
        .then((commentData) => res.json(commentData))
        .catch((err) => res.status(500).json(err));
});

router.delete("/:id", ({ params }, res) => {
    Comment.destroy({ where: { id: params.id } })
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment found with this id!" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
