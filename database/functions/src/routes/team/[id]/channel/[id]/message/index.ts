import {Router} from "express";
import {teamIsAuthorized} from "../../../index";
import admin, {
  channelCollection,
  db,
  messageCollection,
  teamCollection,
} from "../../../../../../firebase-service";

export const messageRouter = Router();

messageRouter.use("/:teamId/channel/:channelId/message", teamIsAuthorized);

messageRouter.get("/:teamId/channel/:channelId/message", async (req, res) => {
  try {
    const messageQuerySnapshot = await db.collection(messageCollection).get();
    const team = await db.collection(teamCollection).doc(req.params.teamId).get();
    const channel = await db.collection(channelCollection).doc(req.params.channelId).get();
    const messages: any[] = [];

    if (!team.exists) {
      res.status(404).send("Team not found");
    }
    if (!team.data()?.channels.includes(channel.id)) {
      res.status(404).send("Channel not found");
    }
    messageQuerySnapshot.forEach(
        (doc) => {
          if (channel.data()?.messages.includes(doc.id)) {
            messages.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        },
    );
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send(error);
  }
});

messageRouter.post("/:teamId/channel/:channelId/message", async (req, res) => {
  try {
    const team = await db.collection(teamCollection).doc(req.params.teamId).get();
    const channel = await db.collection(channelCollection).doc(req.params.channelId).get();

    if (!team.exists) {
      res.status(404).send("Team not found");
    }
    if (!team.data()?.channels.includes(channel.id)) {
      res.status(404).send("Channel not found");
    }
    if (!req.body.content) {
      res.status(400).send("content is required");
    }
    const message = await db.collection(messageCollection).add({
      content: req.body.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: res.locals.uid,
    });
    await db.collection(channelCollection).doc(req.params.channelId).update({
      messages: admin.firestore.FieldValue.arrayUnion(message.id),
    });
    res.status(200).json({id: message.id});
  } catch (error) {
    res.status(500).send(error);
  }
});
