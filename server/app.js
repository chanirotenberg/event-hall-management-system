import express from "express";
import cors from "cors";
import logger from "./utils/logger.js";

import authRouter from "./routes/auth.js";
import hallRouter from "./routes/halls.js";
import bookingRouter from "./routes/bookings.js";
import reviewRouter from "./routes/reviews.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/users.js";
import cateringRouter from "./routes/catering.js";
import paymentRouter from "./routes/payment.js";
import ownerRoutes from "./routes/owner.js";

import startReviewReminderCron from "./services/reviewCron.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

console.log("ENV CHECK:", {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  HAS_PASSWORD: Boolean(process.env.MYSQL_PASSWORD),
});
startReviewReminderCron();

const app = express();

app.use(express.json());

// ✅ בפיתוח עם Vite Proxy אין צורך לנעול origin ל-5173
// הכי פשוט:
app.use(cors());

// אם את רוצה "מקצועי" לפי סביבה:
// app.use(cors(process.env.NODE_ENV === "production"
//   ? { origin: ["https://your-domain.com"], credentials: true }
//   : { origin: true, credentials: true }
// ));

const API_PREFIX = "/api";

// ✅ כל הראוטים תחת /api כדי שה-client יקרא /api/...
app.use(`${API_PREFIX}/payment`, paymentRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/catering`, cateringRouter);
app.use(`${API_PREFIX}/halls`, hallRouter);
app.use(`${API_PREFIX}/bookings`, bookingRouter);
app.use(`${API_PREFIX}/reviews`, reviewRouter);
app.use(`${API_PREFIX}/admin`, adminRouter);
app.use(`${API_PREFIX}/users`, userRouter);
app.use(`${API_PREFIX}/owner`, ownerRoutes);

// לוכד שגיאות גלובלי
app.use((err, req, res, next) => {
  logger.error("❌ Unhandled error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({ error: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}`);
});