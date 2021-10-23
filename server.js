// import modules
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");

// start express
const app = express();
const PORT = process.env.PORT || 3001;

// initialize handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const session = require("express-session");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

// session
const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

// GIVEN a CMS-style blog site

// DONE:
// WHEN I visit the site for the first time
// THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

// DONE:
// WHEN I click on the homepage option
// THEN I am taken to the homepage

// DONE:
// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in

// DONE:
// WHEN I choose to sign up
// THEN I am prompted to create a username and password

// DONE:
// WHEN I click on the sign-up button
// THEN my user credentials are saved and I am logged into the site

// DONE:
// WHEN I revisit the site at a later time and choose to sign in
// THEN I am prompted to enter my username and password

// DONE:
// WHEN I am signed in to the site
// THEN I see navigation links for the homepage, the dashboard, and the option to log out

// DONE:
// WHEN I click on the homepage option in the navigation
// THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

// TODO:
// WHEN I click on an existing blog post
// THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

// TODO:
// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// TODO:
// WHEN I click on the dashboard option in the navigation
// THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

// TODO:
// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post

// TODO:
// WHEN I click on the button to create a new blog post
// THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

// TODO:
// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard

// TODO:
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site

// TODO:
// WHEN I am idle on the site for more than a set time
// THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
