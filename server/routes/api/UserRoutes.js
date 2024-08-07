const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
router.get("/", async (req, res) => {
  try {
    const usersData = await User.find({});
    res.status(200).json({ usersData });
  } catch (err) {
    res.status(500).json({ message: "Couldn't get users" });
  }
});
router.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
    });
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).json({ message: "There is an error on the signup" });
  }
});
router.post("/signin", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Both fields are required" });
  }
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User signed in successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});
module.exports = router;
