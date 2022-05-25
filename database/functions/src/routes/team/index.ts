import { isAuthenticated } from "../../middlewares/authenticate";
import { Router } from "express";
import { teamIdRouter } from "./[id]";

export const teamRouter = Router();

teamRouter.use("/team", isAuthenticated);
teamRouter.use("/team", teamIdRouter);

teamRouter.get("/team", async (req, res) => {
  res.status(200).json({
    message: "Get all teams",
  });
});

teamRouter.post("/team", async (req, res) => {
  res.status(201).json({
    message: "Create a new team",
  });
});