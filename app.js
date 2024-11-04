const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

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

// Sample data
const items = [
    { id: 1, name: "Item 1", category: "Category A" },
    { id: 2, name: "Item 2", category: "Category B" },
    { id: 3, name: "Item 3", category: "Category A" },
];

const categories = ["ALL", "Category A", "Category B"];

// Routes
app.get("/", (req, res) => {
    res.render("home", {
        layout: "main",
        title: "Home",
        items: items,
        categories: categories,
    });
});

app.get("/filter/:category", (req, res) => {
    const category = req.params.category;
    let filteredItems;

    if (category === "ALL") {
        filteredItems = items;
    } else {
        filteredItems = items.filter((item) => item.category === category);
    }

    res.render("home", {
        layout: "main",
        title: "Home",
        items: filteredItems,
        categories: categories,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});