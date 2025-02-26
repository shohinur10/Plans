const express = require("express");
console.log("app: started");
//app
const app = express();

//to use client in app
const db = require("./server").db();

// 1 express kirish code
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//2 sessions code
//3 views code
app.set("views", "./views");
app.set("view engine", "ejs");

//4 routing code
//form in harid has action sending it to /create-item
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne(
    { reja: new_reja },
    (err, data) => {
      console.log(data.ops);
     res.json(data.ops[0]);
});
});

///main page rendering plan.ejs in views
app.get("/", function (req, res)  {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong ");
      } else {
        res.render("reja", { items: data });
      }
    });
});

module.exports = app; 