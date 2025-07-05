const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth")); // Login/Signup
app.use("/api/passwordReset", require("./routes/passwordReset")); // 🔑 Forgot password with OTP
app.use("/api", require("./routes/roomrent")); // Room rent
app.use("/api/room-availability", require("./routes/roomAvailabilityRoute")); // Room availability check
app.use("/api/room-confirmation-tax", require("./routes/roomTax")); // Tax confirmation
app.use("/api/room-close", require("./routes/roomCloseRoutes")); // Room closing
app.use("/api/email", require("./routes/email")); // ⬅️ Email route
app.use("/api/adminemail", require("./routes/Adminrommemail")); // ⬅️ Email route

// ✅ Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
