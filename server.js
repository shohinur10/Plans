const http = require("http");
const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb+srv://Adam:uXxanQ7wECkOgqgT@cluster0.fme80.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
MongoClient.connect(connectionString)
  .then((client) => {
    console.log("Connected to MongoDB");

    module.exports = client;

    // Import app only after DB is connected
    const app = require("./app");

    // Start the server
    const server = http.createServer(app);
    const PORT = 3000;
    server.listen(PORT, () => {
      console.log(` Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB Connection Failed:", err);
  });

