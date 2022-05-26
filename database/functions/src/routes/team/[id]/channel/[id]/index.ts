import {Router} from "express";
import admin, {
  channelCollection,
  db,
  teamCollection,
} from "../../../../../firebase-service";
import {isAuthorized} from "../../../../../middlewares/authorize";
import {teamIsAuthorized} from "../../index";

export const channelIdRouter = Router();

channelIdRouter.use("/:teamId/channel/:channelId", teamIsAuthorized);

channelIdRouter.get("/:teamId/channel/:channelId", async (req, res) => {
  const channelId = req.params.channelId;
  const team = await db.collection(teamCollection).doc(req.params.teamId).get();

  if (!team.exists) {
    res.status(404).send("Team not found");
  }
  if (!team.data()?.channels.includes(channelId)) {
    res.status(404).send("Channel not found");
  }
  db.collection(channelCollection).doc(channelId).get()
      .then((channel) => {
        res.status(200).json({id: channel.id, data: channel.data()});
      }).catch((error) => res.status(500).send(error));
});

channelIdRouter.delete("/:teamId/channel/:channelId", isAuthorized({hasRole: ["admin", "manager"]}),
    async (req, res) => {
      const channelId = req.params.channelId;
      const team = await db.collection(teamCollection).doc(req.params.teamId).get();

      if (!team.exists) {
        res.status(404).send("Team not found");
      }
      if (!team.data()?.channels.includes(channelId)) {
        res.status(404).send("Channel not found");
      }

      try {
        await db.collection(channelCollection).doc(req.params.channelId).delete();
        await db.collection(teamCollection).doc(req.params.teamId).update({
          channels: admin.firestore.FieldValue.arrayRemove(channelId),
        });
        res.status(200).send("Channel deleted");
      } catch (error) {
        res.status(500).send(error);
      }
    });

channelIdRouter.put("/:teamId/channel/:channelId", isAuthorized({hasRole: ["admin", "manager"]}), async (req, res) => {
  const channelId = req.params.channelId;
  const team = await db.collection(teamCollection).doc(req.params.teamId).get();

  if (!team.exists) {
    res.status(404).send("Team not found");
  }
  if (!team.data()?.channels.includes(channelId)) {
    res.status(404).send("Channel not found");
  }

  await db.collection(channelCollection).doc(req.params.channelId).set(req.body, {merge: true})
      .then(() => res.json({id: req.params.channelId}))
      .catch((error) => res.status(500).send(error));
});
