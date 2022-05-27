import {Router} from "express";
import {teamIsAuthorized} from "../../../index";
import admin, {
  channelCollection,
  db,
  postCollection,
  teamCollection,
} from "../../../../../../firebase-service";

export const postRouter = Router();

postRouter.use("/:teamId/channel/:channelId/post", teamIsAuthorized);

postRouter.get("/:teamId/channel/:channelId/post", async (req, res) => {
  try {
    const postQuerySnapshot = await db.collection(postCollection).get();
    const team = await db.collection(teamCollection).doc(req.params.teamId).get();
    const channel = await db.collection(channelCollection).doc(req.params.channelId).get();
    const posts: any[] = [];

    if (!team.exists) {
      res.status(404).send("Team not found");
    }
    if (!team.data()?.channels.includes(channel.id)) {
      res.status(404).send("Channel not found");
    }
    postQuerySnapshot.forEach(
        (doc) => {
          if (channel.data()?.posts.includes(doc.id)) {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        },
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

postRouter.post("/:teamId/channel/:channelId/post", async (req, res) => {
  try {
    const team = await db.collection(teamCollection).doc(req.params.teamId).get();
    const channel = await db.collection(channelCollection).doc(req.params.channelId).get();

    if (!team.exists) {
      res.status(404).send("Team not found");
    }
    if (!team.data()?.channels.includes(channel.id)) {
      res.status(404).send("Channel not found");
    }
    if (!req.body.title) {
      res.status(400).send("title is required");
    }
    if (!req.body.content) {
      res.status(400).send("content is required");
    }
    const post = await db.collection(postCollection).add({
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: res.locals.uid,
    });
    await db.collection(channelCollection).doc(req.params.channelId).update({
      posts: admin.firestore.FieldValue.arrayUnion(post.id),
    });
    res.status(200).json({id: post.id});
  } catch (error) {
    res.status(500).send(error);
  }
});
