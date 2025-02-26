console.log("Web Serverni boshlash");

const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

// MongoDB connection
const db = require("./server").db(); // Get db object from server.js

// Read user data synchronously to ensure it's available
let user;
try {
    const data = fs.readFileSync("database/user.json", "utf-8");
    user = JSON.parse(data);
} catch (err) {
    console.log("ERROR reading user.json:", err);
    user = {}; // Provide a default value to avoid undefined errors
}

// 1: Static Files and Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Views
app.set("views", "views"); // Ensure 'views' directory exists
app.set("view engine", "ejs");

// 3: Routes
app.get("/",  function(req, res) {
    console.log("user entered /");
    db.collection("plans").find().toArray((err, data) => {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
            res.render("reja", {items: data }); // Pass plans to the view
        }
    });
});

app.get("/author", (req, res) => {
    if (!user) {
        return res.status(500).send("User data not loaded.");
    }
    res.render("author", { user });
});

app.post("/create-item", (req, res) => {
    console.log(req.body);
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
        if (err) {
            console.log("something went wrong");
          
        } else {
            res.end("Successfully added");
        }
    });
});

module.exports = app;
