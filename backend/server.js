const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "secret_key";

/* =========================
   REGISTER ROUTE
========================= */
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Registration failed" });
        }

        res.json({ message: "User registered successfully" });
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


/* =========================
   LOGIN ROUTE
========================= */
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {

      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      const user = results[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

      res.json({
        message: "Login successful",
        token: token
      });
    }
  );
});


/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});