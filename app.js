require('dotenv').config();
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const path = require("path");

const indexRoutes = require('./routes/index');
const itemRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3005;

//Handlebars setup
app.engine("handlebars", engine({
    partialsDir: path.join(__dirname, "views/partials"),
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', indexRoutes);
app.use('/', itemRoutes);
app.use('/', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log 
    res.status(500).send('Somthing went wrong!'); // Resoind with err
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});