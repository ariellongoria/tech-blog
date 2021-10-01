const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Vote, Comment } = require("../../models");
const { post } = require("./user-routes");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: [
            "id",
            "post_url",
            "title",
            "created_at",
            [(sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count")],
        ],
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
            res.status(500).json(err);
        });
});

// router.get();

router.post("/", ({ body }, res) => {
    Post.create(body)
        .then((postData) => res.json(postData))
        .catch((err) => res.status(500).json(err));
});

router.post("/upvote", (req, res) => {
    Post.upvote(req.body, { Vote, Comment, User }).then((updatedVoteData) =>
        res.json(updatedVoteData).catch((err) => res.status(500).json(err))
    );
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
