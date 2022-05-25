import { Router } from "express";

export const teamIdRouter = Router();

teamIdRouter.get("/:id", async (req, res) => {
  res.status(200).json({
    message: `Get team ${req.params.id}`,
  });
});

teamIdRouter.delete("/:id", async (req, res) => {
  res.status(200).json({
    message: `Get team ${req.params.id}`,
  });
});

teamIdRouter.put("/:id", async (req, res) => {
  res.status(200).json({
    message: `Get team ${req.params.id}`,
  });
});