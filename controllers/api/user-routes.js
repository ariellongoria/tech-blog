const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");

router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"] },
    })
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Post,
                attributes: ["id", "title", "post_url", "created_at"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"],
                },
            },
            {
                model: Post,
                attributes: ["title"],
                through: Vote,
                as: "voted_posts",
            },
        ],
    })
        .then((userData) => {
            if (!userData) {
                res.status(400).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/", ({ body }, res) => {
    User.create(body)
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
// router.post("/login");
// router.post("logout");
router.put("/:id", ({ body, params }, res) => {
    User.update(body, {
        individualHooks: true,
        where: { id: params.id },
    })
        .then((userData) => {
            if (!userData) {
                res.status(404).json("No user found with this id!");
                return;
            }
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
router.delete("/:id", ({ params }, res) => {
    User.destroy({ where: { id: params.id } })
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No user found with this id!" });
                return;
            }
            res.json(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
