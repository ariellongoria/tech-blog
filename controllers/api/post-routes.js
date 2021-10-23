const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "content", "title", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((postData) => res.json(postData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ["id", "content", "title", "created_at"],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
            {
                model: User,
                attributes: ["username"],
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/", ({ body }, res) => {
    Post.create(body)
        .then((postData) => res.json(postData))
        .catch((err) => res.status(500).json(err));
});

router.put("/:id", ({ body, params }, res) => {
    Post.update(
        {
            title: body.title,
        },
        {
            where: { id: params.id },
        }
    )
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: "No post found with this id!" });
                return;
            }
            res.json(postData);
        })
        .catch((err) => res.status(500).json(err));
});

router.delete("/:id", ({ params }, res) => {
    Post.destroy({
        where: {
            id: params.id,
        },
    })
        .then((postData) => {
            if (!postData) {
                res.status(404).json({ message: "No post found with this id!" });
                return;
            }
            res.json(postData);
        })
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
