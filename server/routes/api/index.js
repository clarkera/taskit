const express = require("express");
const router = express.Router();
const userRoutes = require("./UserRoutes");
router.use("/user", userRoutes);
module.exports = router;
