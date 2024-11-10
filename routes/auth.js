const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

            // Testing
            (async () => {
                const bcrypt = require('bcrypt');
                const testPassword = "password";
                const testHash = await bcrypt.hash(testPassword, 10);
                console.log("Test hash for 'password':", testHash);


                const storedHash = "$2b$10$sLr0T0F2bX8hh3ykbPtqleU41lGPJpinSBuNfrtY0tba6yz6"; // hash from database
                const password = "password"; // plain password
                const match = await bcrypt.compare(password, storedHash);
                console.log("Password matches:", match); // Should print true if valid

            })();
            // end of testing

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Register route (GETt)
router.get("/register", (req, res) => {
    res.render("register", { layout: false, title: "Register"});
});

// Register route (post)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        await User.create({ username, password });
        res.redirect('/login');
    } catch (error) {
        res.render('register', {layout: "main", title: "Register", error: error.message });
    }
});

//Login route (GET)
router.get('/login', (req, res) => {
    res.render('login', { layout: false, title: "login"});
});

// Login route (POST)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username }});
        console.log("user found", user);

        if (user && await user.validPassword(password)) {
            console.log("User verified redirecting...");
            req.session.user = user.username;
            console.log("session user is current user");
            res.redirect('/dashboard');

        } else {layout: "main",
            console.log("User not verifiedm redirecting to login");
            res.render('login', { layout: "main", title: "Login", error: 'Invalid Credentials'});

        }
    } catch (error) {
        console.log("Error during login:", error);
        res.render('login', { layout: "main", title: "Login", error: error.message});
    }
});

// Dashboard route (protected)
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const items = await Item.findAll({
            limit: 10,
            order: [['id', 'DESC']]
        });

        res.render("dashboard", {
            layout: "dashboard",
            title: "Dashboard Items",
            items: items.map((item) => item.get({ plain: true })),
        });
    } catch (error) {
        console.error("error fetching data:", error);
        res.status(500).send("an error occured while fetching data")
    }
});

module.exports = router;