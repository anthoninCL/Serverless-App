import {isAuthenticated} from "../../middlewares/authenticate";
import {Router} from "express";
import {teamIdRouter} from "./[id]";
import {db, teamCollection} from "../../firebase-service";
import {isAuthorized} from "../../middlewares/authorize";
import {channelRouter} from "./[id]/channel";
import {channelIdRouter} from "./[id]/channel/[id]";
import {messageRouter} from "./[id]/channel/[id]/message";
import {messageIdRouter} from "./[id]/channel/[id]/message/[id]";
import {postRouter} from "./[id]/channel/[id]/post";
import {postIdRouter} from "./[id]/channel/[id]/post/[id]";

export const teamRouter = Router();

teamRouter.use("/team", isAuthenticated);
teamRouter.use("/team", teamIdRouter);
teamRouter.use("/team", channelRouter);
teamRouter.use("/team", channelIdRouter);
teamRouter.use("/team", messageRouter);
teamRouter.use("/team", messageIdRouter);
teamRouter.use("/team", postRouter);
teamRouter.use("/team", postIdRouter);


teamRouter.get("/team", async (req, res) => {
  try {
    const teamQuerySnapshot = await db.collection(teamCollection).get();
    const teams: any[] = [];

    teamQuerySnapshot.forEach(
        (doc) => {
          if (doc.data().members.includes(res.locals.uid) || res.locals.role == "admin") {
            teams.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        },
    );
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send(error);
  }
});

teamRouter.post("/team", isAuthorized({hasRole: ["admin"]}), async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("name is required");
  }
  try {
    const team = await db.collection(teamCollection).add({
      name: req.body.name,
      members: req.body.members || [res.locals.uid],
      channels: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(`New team created: ${team.id}`);
  } catch (e) {
    res.status(500).send(e);
  }
});
