import "dotenv/config";
import connectToDatabase from "./database/mongodb.js";

import express from "express";

import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(process.env.PORT || 3000, async () => {
    console.log(`server is running on port ${process.env.PORT}`);
    await connectToDatabase();
});
