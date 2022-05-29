import {NextFunction, Request, Response, Router} from "express";
import {friendIsAuthorized} from "../../index";
import {messageRouter} from "../index";
import admin, {
  db,
  friendCollection,
  messageCollection,
} from "../../../../../firebase-service";
import {isAuthorized} from "../../../../../middlewares/authorize";

export const messageIdRouter = Router();

messageRouter.use("/:friendId/message/:messageId", friendIsAuthorized);

messageIdRouter.get("/:friendId/message/:messageId", async (req, res) => {
  const messageId = req.params.messageId;
  const friend = await db.collection(friendCollection).doc(req.params.friendId).get();

  if (!friend.exists) {
    res.status(404).send("Friend not found");
  }
  if (!friend.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }
  db.collection(messageCollection).doc(messageId).get()
      .then((message) => {
        res.status(200).json({id: message.id, data: message.data()});
      }).catch((error) => res.status(500).send(error));
});

const messageIsAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const message = await db.collection(messageCollection).doc(req.params.messageId).get();

  if (message.exists) {
    if (message.data()?.user === res.locals.uid) {
      next();
    } else {
      isAuthorized({hasRole: ["admin"]})(req, res, next);
    }
  } else {
    res.status(404).send("Message not found");
  }
};

messageIdRouter.delete("/:friendId/message/:messageId", messageIsAuthorized, async (req, res) => {
  const messageId = req.params.messageId;
  const friendId = req.params.friendId;
  const friend = await db.collection(friendCollection).doc(req.params.friendId).get();

  if (!friend.exists) {
    res.status(404).send("Friend not found");
  }
  if (!friend.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }
  try {
    await db.collection(messageCollection).doc(messageId).delete();
    await db.collection(friendCollection).doc(friendId).update({
      messages: admin.firestore.FieldValue.arrayRemove(messageId),
    });
    res.status(200).send("Message deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

messageIdRouter.put("/:friendId/message/:messageId", messageIsAuthorized, async (req, res) => {
  const messageId = req.params.messageId;
  const friend = await db.collection(friendCollection).doc(req.params.friendId).get();

  if (!friend.exists) {
    res.status(404).send("Friend not found");
  }
  if (!friend.data()?.messages.includes(req.params.messageId)) {
    res.status(404).send("Message not found");
  }
  await db.collection(messageCollection).doc(messageId).set(req.body, {merge: true})
      .then(() => res.json({id: messageId}))
      .catch((error) => res.status(500).send(error));
});
