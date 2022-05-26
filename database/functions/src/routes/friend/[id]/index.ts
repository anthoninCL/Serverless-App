import {NextFunction, Request, Response, Router} from "express";
import {db, friendCollection} from "../../../firebase-service";
import {isAuthorized} from "../../../middlewares/authorize";

export const friendIdRouter = Router();

export const friendIsAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const friend = await db.collection(friendCollection).doc(req.params.friendId).get();

  if (friend.exists) {
    if (friend.data()?.users.includes(res.locals.uid)) {
      next();
    } else {
      isAuthorized({hasRole: ["admin"]})(req, res, next);
    }
  }

  res.status(400).send("friendship is not exist");
};

friendIdRouter.use("/:friendId", friendIsAuthorized);

friendIdRouter.get("/:friendId", async (req, res) => {
  try {
    const friend = await db.collection(friendCollection).doc(req.params.friendId).get();
    res.status(200).json(friend.data());
  } catch (error) {
    res.status(500).send(error);
  }
});

friendIdRouter.delete("/:friendId", async (req, res) => {
  try {
    await db.collection(friendCollection).doc(req.params.friendId).delete();
    res.status(200).json("friendship deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

friendIdRouter.put("/:friendId", async (req, res) => {
  try {
    await db.collection(friendCollection).doc(req.params.friendId).set(req.body, {merge: true});
    res.status(200).json({id: req.params.friendId});
  } catch (error) {
    res.status(500).send(error);
  }
});
