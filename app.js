import express from "express";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import cors from "cors";
import { config } from "dotenv";
import globalErrorHandler from "./controllers/errorController.js";
import router from "./routes/flightRoutes.js";
import userRouter from "./routes/authRoutes.js";
import infoRouter from "./routes/infoRoutes.js";
import hpp from "hpp";
const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(cors());
app.use("/api", limiter);
app.use(express.json());

app.use(xss());
app.use(hpp());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/flights", router);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/info", infoRouter)

app.use("*", (req, res, next) => {
  res.send("Server is running !!!");
});

app.use(globalErrorHandler);
export default app;
