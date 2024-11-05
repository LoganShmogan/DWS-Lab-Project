const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require('./database');
const Item = require('./item');
const { QueryTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3005;

app.engine(
    "handlebars",
    engine({
        partialsDir: path.join(__dirname, "views/partials"),
    })
);
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// // Sample data
// const items = [
//     { id: 1, name: "Item 1", category: "Category A" },
//     { id: 2, name: "Item 2", category: "Category B" },
//     { id: 3, name: "Item 3", category: "Category A" },
// ];

// const categories = ["ALL", "Category A", "Category B"];

// Routes
app.get("/",  async (req, res) => {
    try {
        const items = await Item.findAll();
        const plainItems = items.map(item => item.get({ plain: true }));

        // Retrieve distinct categories
        const distinctCategories = await sequelize.query(
            "SELECT DISTINCT category FROM items",
            { type: QueryTypes.SELECT }
        );

        const categories = ['ALL', ...distinctCategories.map(item => item.category)];

        res.render("home", {
            layout: "main",
            title: "Home",
            items: plainItems,
            categories: categories,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.get("/filter/:category", async (req, res) => {
    try {
        const category = req.params.category;
        let items;

        if (category === "ALL") {
            items = await Item.findAll();
        } else {
            items = await Item.findAll({ where: { category } });
        }

        const plainItems = items.map(item => item.get({ plain: true }));

        // Retrieve distinct categories
        const distinctCategories = await sequelize.query(
            "SELECT DISTINCT category FROM items",
            { type: QueryTypes.SELECT }
        );

        const categories = ['ALL', ...distinctCategories.map(item => item.category)];

        res.render("home", {
            layout: "main",
            title: "Home",
            items: plainItems,
            categories: categories,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});