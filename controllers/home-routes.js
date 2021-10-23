const router = require("express").Router();
const { Post, User } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "content", "title", "created_at"],
        include: {
            model: User,
            attributes: ["username"],
        },
    }).then((postData) => {
        console.log(req.session);
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    });
});

router.get("/post/:id", (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ["id", "content", "title", "created_at"],
        include: {
            model: User,
            attributes: ["username"],
        },
    }).then((postData) => {
        const post = postData.get({ plain: true });
        console.log(post);
        res.render("single-post", { post, loggedIn: req.session.loggedIn });
    });
});

router.get("/dashboard", (req, res) => {
    console.log(req.session);
    User.findOne({
        where: { id: req.session.user_id },
        attributes: { exclude: ["password"] },
        include: { model: Post, attributes: ["id", "content", "title", "created_at"] },
    }).then((userData) => {
        const user = userData.get({ plain: true });
        res.render("dashboard", { user, loggedIn: req.session.loggedIn });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;
