const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", "title", "created_at"],
        include: {
            model: User,
            attributes: ["username"],
        },
    }).then((postData) => {
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { posts });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
