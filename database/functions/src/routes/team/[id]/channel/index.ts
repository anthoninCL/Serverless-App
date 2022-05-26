import {Router} from "express";
import admin, {
  channelCollection,
  db,
  teamCollection,
} from "../../../../firebase-service";
import {teamIsAuthorized} from "../index";
import {isAuthorized} from "../../../../middlewares/authorize";

export const channelRouter = Router();

channelRouter.use("/:teamId/channel", teamIsAuthorized);

channelRouter.get("/:teamId/channel", async (req, res) => {
  try {
    const channelQuerySnapshot = await db.collection(channelCollection).get();
    const team = await db.collection(teamCollection).doc(req.params.teamId).get();
    const channels: any[] = [];

    if (!team.exists) {
      res.status(404).send("Team not found");
    }
    channelQuerySnapshot.forEach(
        (doc) => {
          if (team.data()?.channels.includes(doc.id)) {
            channels.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        },
    );
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).send(error);
  }
});

channelRouter.post("/:teamId/channel", isAuthorized({hasRole: ["admin", "manager"]}), async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("name is required");
  }
  try {
    const channel = await db.collection(channelCollection).add({
      name: req.body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      messages: [],
    });
    await db.collection(teamCollection).doc(req.params.teamId).update({
      channels: admin.firestore.FieldValue.arrayUnion(channel.id),
    });
    res.status(200).json(`New channel created: ${channel.id}`);
  } catch (e) {
    res.status(500).send(e);
  }
});
