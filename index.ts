// import { Application } from "express";
const appExpress = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// import xss from "xss-clean";
// import { NextFunction } from "express";
// import { Application } from "express";
const authRouter = require("./routes/AuthRoute");
const debitRouter = require("./routes/DebitRoute");
const creditRouter = require("./routes/CreditRoute");

const app = express();

const ApplicationError = require("./Utils/AppError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

app.use(helmet());

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limit);
app.use(appExpress.json({ limit: "10kb" }));
app.use(mongoSanitize());

// serving static files
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  console.log("Development Mode 💥");
}

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/credits", creditRouter);
app.use("/api/v1/debits", debitRouter);

app.use("*", (req: any, res: any, next: any) => {
  next(
    new ApplicationError(`Cannot find ${req.originalUrl} on this server`, 404)
  );
});

// global error handler for every request
app.use(globalErrorHandler);

module.exports = app;
