const Post = require("./Post");
const User = require("./User");
const Vote = require("./Vote");
const Comment = require("./Comment");

// One user can have many posts, indicated by user_id in the post.
User.hasMany(Post, {
    foreignKey: "user_id",
});

// One post belongs to one user, indicated by user_id in the user
Post.belongsTo(User, {
    foreignKey: "user_id",
});

// User belongs to many posts, through votes, indicated by user_id and shown as voted_posts
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id",
});

Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id",
});

Vote.belongsTo(User, {
    foreignKey: "user_id",
});

Vote.belongsTo(Post, {
    foreignKey: "post_id",
});

User.hasMany(Vote, {
    foreignKey: "user_id",
});

Post.hasMany(Vote, {
    foreignKey: "post_id",
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

User.hasMany(Comment, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
});

module.exports = { User, Post, Vote, Comment };