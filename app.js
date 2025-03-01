console.log("Let's start the project");

const express = require('express');
const app = express();
const mongodb = require("mongodb");
const db = require("./server").db(); // Ensure server.js exports `db()`

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS views
app.set("views", "views");
app.set("view engine", "ejs");

// Create item
app.post("/create-item", (req, res) => {
    console.log("User entered /create-item");
    console.log(req.body);

    const new_reja = req.body.reja.trim();
    if (!new_reja) {
        return res.json({ error: "Cannot add empty item" });
    }

    db.collection("plans").insertOne({ reja: new_reja })
        .then(data => res.json({ _id: data.insertedId, reja: new_reja }))
        .catch(err => res.status(500).json({ error: "Database error" }));
});

// Delete item
app.post("/delete-item", (req, res) => {
    const id = req.body.id;
    
    db.collection("plans").deleteOne({ _id: new mongodb.ObjectId(id) })
        .then(() => res.json({ state: "success" }))
        .catch(err => res.status(500).json({ error: "Delete failed" }));
});

// Edit item
app.post("/edit-item", (req, res) => {
    const { id, new_input } = req.body;

    db.collection("plans").findOneAndUpdate(
        { _id: new mongodb.ObjectId(id) },
        { $set: { reja: new_input.trim() } }
    )
    .then(() => res.json({ state: "success" }))
    .catch(err => res.status(500).json({ error: "Edit failed" }));
});

// Delete all
app.post("/delete-all", (req, res) => {
    if (req.body.delete_all) {
        db.collection("plans").deleteMany({})
            .then(() => res.json({ state: "All plans are deleted" }))
            .catch(err => res.status(500).json({ error: "Delete-all failed" }));
    }
});

// Author page (fix undefined `user`)
app.get("/author", (req, res) => {
    const user = { name: "Your Name", email: "your@email.com" }; // Replace with actual user info
    res.render("author", { user });
});

// Render main page
app.get("/", (req, res) => {
    console.log("User entered /");

    db.collection("plans").find().toArray()
        .then(data => res.render("reja", { items: data }))
        .catch(err => {
            console.error("Something went wrong:", err);
            res.status(500).send("Internal server error");
        });
});

// Export Express app
module.exports = app;
