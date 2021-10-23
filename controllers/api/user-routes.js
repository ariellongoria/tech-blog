const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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
                attributes: ["id", "title", "content", "created_at"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "created_at"],
                include: {
                    model: Post,
                    attributes: ["title"],
                },
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
router.post("/login", (req, res) => {
    User.findOne({
        where: { email: req.body.email },
    }).then((loginData) => {
        if (!loginData) {
            res.status(400).json({ message: "No user found with this email!" });
            return;
        }

        const validPassword = loginData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = loginData.id;
            req.session.username = loginData.username;
            req.session.loggedIn = true;
            console.log(req.session);
            res.json({ user: loginData, message: "You are now logged in!" });
        });
    });
});

router.post("/logout", (req, res) => {
    console.log(req.session.loggedIn);
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

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
