import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => res.json({ message: "GET all users" }));

userRouter.get("/:id", (req, res) => res.send({ message: "GET user" }));

userRouter.post("/", (req, res) => res.send({ message: "CREATE user" }));

userRouter.put("/:id", (req, res) => res.send({ message: "UPDATE user" }));

userRouter.delete("/:id", (req, res) => res.send({ message: "DELETE user" }));

export default userRouter;
