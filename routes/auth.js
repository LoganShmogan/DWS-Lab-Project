const express = require('express');
const router = expresss.Router();

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

//Login route (GET)
router.get('/login', (req, res) => {
    res.render('login', { layout: false, title: "login"});
});

// Login route (POST)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials. Please <a href="/login">try again</a>.');
    }
});

// Dashboard route (protected)
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.session.user, // Pass loggin in user
        layout: false,
        title: "Dashboard"
    }); 
});

module.exports = router;