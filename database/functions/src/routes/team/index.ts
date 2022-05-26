import { isAuthenticated } from "../../middlewares/authenticate";
import { Router } from "express";
import { teamIdRouter } from "./[id]";
import { db, teamCollection } from "../../firebase-service";
import { isAuthorized } from "../../middlewares/authorize";

export const teamRouter = Router();

teamRouter.use("/team", isAuthenticated);
teamRouter.use("/team", teamIdRouter);

teamRouter.get("/team", async (req, res) => {
  try {
    const teamQuerySnapshot = await db.collection(teamCollection).get();
    const teams: any[] = [];
    teamQuerySnapshot.forEach(
      (doc)=>{
        if (doc.data().members.includes(res.locals.uid) || res.locals.role == "admin") {
          teams.push({
            id: doc.id,
            data: doc.data()
          });
        }
      }
    );
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});

teamRouter.post("/team", isAuthorized({hasRole: ["admin"]}), async (req, res) => {
  res.status(201).json({
    message: "Create a new team",
  });
});