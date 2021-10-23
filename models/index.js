const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

// One user can have many posts, indicated by user_id in the post.
User.hasMany(Post, {
    foreignKey: "user_id",
});

// One post belongs to one user, indicated by user_id in the user
Post.belongsTo(User, {
    foreignKey: "user_id",
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

module.exports = { User, Post, Comment };
