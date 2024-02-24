import express, { Application } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
const authRouter = require("./routes/AuthRoute");
const debitRouter = require("./routes/DebitRoute");
const creditRouter = require("./routes/CreditRoute");
const cors = require("cors");

const app: Application = express();
app.use(cors);

const AppError = require("./Utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

app.use(helmet());

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limit);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());

// serving static files
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  console.log("Development Mode 💥");
}

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/credits", creditRouter);
app.use("/api/v1/debits", debitRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// global error handler for every request
app.use(globalErrorHandler);

module.exports = app;
