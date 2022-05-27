import {Router} from "express";
import {isAuthenticated} from "../../middlewares/authenticate";
import {db, friendCollection, userCollection} from "../../firebase-service";
import {friendIdRouter} from "./[id]";
import {messageRouter} from "./[id]/message";
import {messageIdRouter} from "./[id]/message/[id]";


export const friendRouter = Router();

friendRouter.use("/friend", isAuthenticated);
friendRouter.use("/friend", friendIdRouter);
friendRouter.use("/friend", messageRouter);
friendRouter.use("/friend", messageIdRouter);

friendRouter.get("/friend", async (req, res) => {
  try {
    const friendQuerySnapshot = await db.collection(friendCollection).get();
    const friends: any[] = [];

    friendQuerySnapshot.forEach(
        (doc) => {
          if (doc.data().members.includes(res.locals.uid)) {
            friends.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        },
    );
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).send(error);
  }
});

friendRouter.post("/friend", async (req, res) => {
  if (!req.body.id) {
    res.status(400).send("id is required");
  }
  try {
    if (await db.collection(userCollection).doc(req.body.id).get() == null) {
      res.status(400).send("id is not exist");
    }
    const friend = await db.collection(friendCollection).add({
      users: [res.locals.uid, req.body.id],
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    });

    res.status(200).json({id: friend.id});
  } catch (error) {
    res.status(500).send(error);
  }
});
