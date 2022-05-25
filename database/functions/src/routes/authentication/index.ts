import { Router } from "express";
import { signupRouter } from "./signup";


export const authenticationRouter = Router();

authenticationRouter.use("/authentication", signupRouter);
