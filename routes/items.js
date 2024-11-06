const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const dbConnection = require('../config/database');
const { QueryTypes } = require('sequelize');

// Filter route

router.get("/filter/:category", async (req, res) => {
    try {
        const category = req.params.category;
        console.log("Requested category:");

        if (category === "ALL") {
            items = await Item.findAll();
        } else {
            item = await Item.findAll({ where: { category }});
        }

        const plainItems = items.map(item => item.get({ plain: true }));

        // Retrieve distinct categpries
        const distinctCategories = await dbConnection.query(
            "SELECT DISTINCT category FROM items",
            { type: QueryTypes.SELECT }
        );

        const categories = ["ALL", ...distinctCategories.map(item => item.category)];

        res.render("home", {
            layout: "main",
            title: "Home",
            items: plainItems, 
            categories: categories
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('An error occured while fetching data');
    }
});

module.exports = router;