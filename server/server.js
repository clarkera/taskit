const express = require("express");
const dataBase = require("./config/connection");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
const startServer = async () => {
  try {
    await dataBase(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process with failure
  }
};
startServer();
