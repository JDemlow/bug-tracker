const Ticket = require("../models/Ticket");
const passport = require("passport");

const express = require("express");
const router = express.Router();

// Define routes for ticket management
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  // Get a specific ticket by ID
});

router.post("/", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to log in after registration." });
      }

      res.status(201).json({ message: "User registered and logged in." });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "User logged in." });
});

router.put("/:id", (req, res) => {
  // Update a specific ticket by ID
});

router.delete("/:id", (req, res) => {
  // Delete a specific ticket by ID
});

module.exports = router;
