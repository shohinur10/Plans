const http = require("http");
const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb+srv://Adam:uXxanQ7wECkOgqgT@cluster0.fme80.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=Cluster0";

let db;

// Connect to MongoDB
MongoClient.connect(connectionString)
  .then((client) => {
    console.log(" Connected to MongoDB");
    db = client.db(); // Set the database object

    // Export db for use in other files
    module.exports = {
      db: () => db,
    };

    // Import app only after DB connection is successful
    const app = require("./app");

    // Start the server
    const server = http.createServer(app);
    const PORT = 3000;
    server.listen(PORT, () => {
      console.log(`Server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB Connection Failed:", err);
  });
