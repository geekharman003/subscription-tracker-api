import { Router } from "express";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getRenewalsSubscriptions,
  getSubscription,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscriptions.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get(
  "/upcoming-renewals",
  authorize,
  getRenewalsSubscriptions
);
subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;
