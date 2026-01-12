import "dotenv/config";

import express, { urlencoded } from "express";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import archjetMiddleware from "./middlewares/archjet.middleware.js";

import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// parse json data
app.use(express.json());

// parse url encoded data
app.use(urlencoded({ extended: false }));

// parse cookie data
app.use(cookieParser());

app.use(archjetMiddleware);

app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);

// global error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`server is running on port ${process.env.PORT}`);
  await connectToDatabase();
});
