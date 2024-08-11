const express = require("express");
const path = require("path");
const dataBase = require("./config/connection");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
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
dataBase.sync({ force: true });
