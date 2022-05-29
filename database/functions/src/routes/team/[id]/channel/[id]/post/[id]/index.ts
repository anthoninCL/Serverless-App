import {NextFunction, Request, Response, Router} from "express";
import {teamIsAuthorized} from "../../../../index";
import admin, {
  channelCollection,
  db,
  postCollection,
  teamCollection,
} from "../../../../../../../firebase-service";
import {isAuthorized} from "../../../../../../../middlewares/authorize";

export const postIdRouter = Router();

postIdRouter.use("/:teamId/channel/:channelId/post/:postId", teamIsAuthorized);

postIdRouter.get("/:teamId/channel/:channelId/post/:postId", async (req, res) => {
  const channelId = req.params.channelId;
  const postId = req.params.postId;
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
  if (!channel.data()?.posts.includes(req.params.postId)) {
    res.status(404).send("Post not found");
  }
  db.collection(postCollection).doc(postId).get()
      .then((post) => {
        res.status(200).json({id: post.id, data: post.data()});
      }).catch((error) => res.status(500).send(error));
});

const postIsAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  const post = await db.collection(postCollection).doc(req.params.postId).get();

  if (post.exists) {
    if (post.data()?.user === res.locals.uid) {
      next();
    } else {
      isAuthorized({hasRole: ["admin", "manager"]})(req, res, next);
    }
  } else {
    res.status(404).send("Post not found");
  }
};

postIdRouter.delete("/:teamId/channel/:channelId/post/:postId", postIsAuthorized, async (req, res) => {
  const channelId = req.params.channelId;
  const postId = req.params.postId;
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
  if (!channel.data()?.posts.includes(req.params.postId)) {
    res.status(404).send("Post not found");
  }

  try {
    await db.collection(postCollection).doc(postId).delete();
    await db.collection(channelCollection).doc(channelId).update({
      posts: admin.firestore.FieldValue.arrayRemove(postId),
    });
    res.status(200).send("Post deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

postIdRouter.put("/:teamId/channel/:channelId/post/:postId", postIsAuthorized, async (req, res) => {
  const channelId = req.params.channelId;
  const postId = req.params.postId;
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
  if (!channel.data()?.posts.includes(req.params.postId)) {
    res.status(404).send("Post not found");
  }

  await db.collection(postCollection).doc(postId).set(req.body, {merge: true})
      .then(() => res.json({id: postId}))
      .catch((error) => res.status(500).send(error));
});
