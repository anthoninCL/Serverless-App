import {Router} from "express";
import {friendIsAuthorized} from "../index";
import admin, {
  db,
  friendCollection,
  messageCollection,
} from "../../../../firebase-service";

export const messageRouter = Router();

messageRouter.use("/:friendId/message", friendIsAuthorized);

messageRouter.get("/:friendId/message", async (req, res) => {
  try {
    const messageQuerySnapshot = await db.collection(messageCollection).get();
    const friend = await db.collection(friendCollection).doc(req.params.friendId).get();
    const messages: any[] = [];

    if (!friend.exists) {
      res.status(404).send("Friend not found");
    }
    messageQuerySnapshot.forEach(
        (doc) => {
          if (friend.data()?.messages.includes(doc.id)) {
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

messageRouter.post("/:friendId/message", async (req, res) => {
  try {
    const friend = await db.collection(friendCollection).doc(req.params.friendId).get();

    if (!friend.exists) {
      res.status(404).send("Friend not found");
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
    await db.collection(friendCollection).doc(req.params.friendId).update({
      messages: admin.firestore.FieldValue.arrayUnion(message.id),
    });
    res.status(200).json({id: message.id});
  } catch (error) {
    res.status(500).send(error);
  }
});
