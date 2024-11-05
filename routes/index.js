const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const dbConnection = require('../config/database');
const { QueryTypes } = require('sequelize');

router.get("/", async (req, res) => {
    try {
        const items = await Item.findAll();
        const distinctCategories = await dbConnection.query(
            "SELECT DISTINCT category FROM Items",
            { type: QueryTypes.SELECT}
        );
        const categories = ['ALL', ...distinctCategories.map(item => item.category)];

        res.render("home", {
            layout: "main",
            title: "Home",
            items: item.map(item => item.get({ plain: true })), // COnvert sequelize instances to plain objects
            categories: categories
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('An error occured while fetching data');
    }
});

module.exports = router;