import {NextFunction, Request, Response, Router} from "express";
import {teamIsAuthorized} from "../../../../index";
import admin, {
  channelCollection,
  db,
  messageChannelCollection,
  teamCollection,
} from "../../../../../../../firebase-service";
import {isAuthorized} from "../../../../../../../middlewares/authorize";

export const messageIdRouter = Router();

messageIdRouter.use("/:teamId/channel/:channelId/message/:messageId", teamIsAuthorized);

messageIdRouter.get("/:teamId/channel/:channelId/message/:messageId", async (req, res) => {
  const channelId = req.params.channelId;
  const messageId = req.params.messageId;
  const team = await db.collection(teamCollection).doc(req.params.teamId).get();
  const channel = await db.collection(channelCollection).doc(channelId).get();

  if (!team.exists) {
    res.status(404).send("Team not found");
  }
  if (!team.data()?.channels.includes(channelId)) {
    res.status(404).send("Channel not found");
  }
  if (!channel.exists) {
    res.status(404).send("Channel not found");
  }
  if (!channel.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }
  db.collection(messageChannelCollection).doc(messageId).get()
      .then((message) => {
        res.status(200).json({id: message.id, data: message.data()});
      }).catch((error) => res.status(500).send(error));
});

const messageIsAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const message = await db.collection(messageChannelCollection).doc(req.params.messageId).get();

  if (message.exists) {
    if (message.data()?.user === res.locals.uid) {
      next();
    } else {
      isAuthorized({hasRole: ["admin", "manager"]})(req, res, next);
    }
  } else {
    res.status(404).send("Message not found");
  }
};

messageIdRouter.delete("/:teamId/channel/:channelId/message/:messageId", messageIsAuthorized, async (req, res) => {
  const channelId = req.params.channelId;
  const messageId = req.params.messageId;
  const team = await db.collection(teamCollection).doc(req.params.teamId).get();
  const channel = await db.collection(channelCollection).doc(channelId).get();

  if (!team.exists) {
    res.status(404).send("Team not found");
  }
  if (!team.data()?.channels.includes(channelId)) {
    res.status(404).send("Channel not found");
  }
  if (!channel.exists) {
    res.status(404).send("Channel not found");
  }
  if (!channel.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }

  try {
    await db.collection(messageChannelCollection).doc(messageId).delete();
    await db.collection(channelCollection).doc(channelId).update({
      messages: admin.firestore.FieldValue.arrayRemove(messageId),
    });
    res.status(200).send("Message deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

messageIdRouter.put("/:teamId/channel/:channelId/message/:messageId", messageIsAuthorized, async (req, res) => {
  const channelId = req.params.channelId;
  const messageId = req.params.messageId;
  const team = await db.collection(teamCollection).doc(req.params.teamId).get();
  const channel = await db.collection(channelCollection).doc(channelId).get();

  if (!team.exists) {
    res.status(404).send("Team not found");
  }
  if (!team.data()?.channels.includes(channelId)) {
    res.status(404).send("Channel not found");
  }
  if (!channel.exists) {
    res.status(404).send("Channel not found");
  }
  if (!channel.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }

  await db.collection(messageChannelCollection).doc(messageId).set(req.body, {merge: true})
      .then(() => res.json({id: messageId}))
      .catch((error) => res.status(500).send(error));
});
