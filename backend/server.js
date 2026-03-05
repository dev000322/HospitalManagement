require("dotenv").config();

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("Resend key loaded:", process.env.RESEND_API_KEY?.slice(0, 10));

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = process.env.JWT_SECRET;

/* =========================
   EMAIL FUNCTION
========================= */

async function sendAppointmentEmail(email, name, doctor, date, time) {
  try {
    await resend.emails.send({
      from: "Hospital Management <onboarding@resend.dev>",
      to: [email],
      subject: "Hospital Appointment Confirmation",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:30px;">
        
        <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:8px;">
          
          <h2 style="color:#2c7be5;text-align:center;">
            <b>Hospital Management System</b>
          </h2>

          <hr/>

          <p>Hello <b>${name}</b>,</p>

          <p>Your appointment has been <b style="color:green;">successfully booked</b>.</p>

          <h3>Appointment Details</h3>

          <table style="width:100%;border-collapse:collapse;">
            
            <tr>
              <td><b>Patient Name</b></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><b>Doctor</b></td>
              <td>${doctor}</td>
            </tr>

            <tr>
              <td><b>Date</b></td>
              <td>${date}</td>
            </tr>

            <tr>
              <td><b>Appointment Time</b></td>
              <td>${time}</td>
            </tr>

          </table>

          <p style="margin-top:20px;">
            Please arrive <b>10 minutes before</b> your scheduled appointment.
          </p>

          <hr/>

          <h4>Contact Information</h4>

          <p>
          📧 Email: hospital.management.system@gmail.com<br>
          📞 Phone: +91 9876543210<br>
          📍 Address: City Hospital, Bangalore
          </p>

          <p style="text-align:center;color:gray;">
          © 2026 Hospital Management System
          </p>

        </div>
      </div>
      `
    });

    console.log("Appointment email sent successfully to:", email);

  } catch (error) {
    console.error("Email error:", error);
  }
}

/* =========================
   REGISTER ROUTE
========================= */

app.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  console.log("Signup data:", name, email);

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {

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

app.post("/login", (req, res) => {

  const email = req.body.email.trim();
  const password = req.body.password;

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

      const token = jwt.sign(
        { id: user.id },
        SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token: token,
        name: user.name
      });

    }
  );

});

/* =========================
   BOOK APPOINTMENT
========================= */

app.post("/book-appointment", async (req, res) => {

  const { name, email, doctor, date, time } = req.body;

  db.query(
    "INSERT INTO appointments (name, email, doctor, date, time) VALUES (?, ?, ?, ?, ?)",
    [name, email, doctor, date, time],
    async (err) => {

      if (err) {
        console.error("❌ DB Error:", err);
        return res.status(500).json({ message: "Appointment booking failed" });
      }

      await sendAppointmentEmail(email, name, doctor, date, time);

      res.json({
        message: "Appointment booked and email sent"
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