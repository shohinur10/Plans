console.log("Web Serverni boshlash");

const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

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
app.get("/", (req, res) => {
    res.render("harid"); // Ensure 'views/harid.ejs' exists
});

app.get("/author", (req, res) => {
    if (!user) {
        return res.status(500).send("User data not loaded.");
    }
    res.render("author", { user });
});

app.post("/create-item", (req, res) => {
    console.log(req.body);
    res.json({ message: "success" });
});

// Start Server
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`The server is running successfully on port: ${PORT}`);
});