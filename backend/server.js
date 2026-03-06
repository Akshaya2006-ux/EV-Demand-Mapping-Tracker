const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "akshayakrishnamohan@gmail.com",
    pass: "myjyidpwzjfknobi"
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("EV Backend Running 🚀");
});app.post("/send-email", async (req, res) => {

  console.log("Route received:", req.body);

  try {

    const info = await transporter.sendMail({
      from: "akshayakrishnamohan@gmail.com",
      to: "cegctfprojects@gmail.com",
      subject: "EV Ride Request",
      text: "Student requested EV ride"
    });

    console.log("Mail sent:", info.response);

    res.status(200).send("Email sent");

  } catch (error) {

    console.log("Mail error:", error);

    res.status(500).send("Email failed");

  }

});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});