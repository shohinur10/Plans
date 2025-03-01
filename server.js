const http = require("http");
const mongodb = require("mongodb");

// MongoDB connection
let db;
const MONGO_URL =
"mongodb+srv://Adam:uXxanQ7wECkOgqgT@cluster0.fme80.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0";
 



// Using connect function of MongoDB
mongodb.connect(
  MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log(error);
    } else {
      const PORT = 3000;
      console.log("database:connected successfully");
      db = client.db(); // Get the database
      module.exports = client;
      const app = require("./app");
      const server = http.createServer(app);
      server.listen(PORT, () => {
        console.log(`server: this app is running successfully in port: ${PORT}, http://localhost:${PORT}`);
      });
    }
  }
);