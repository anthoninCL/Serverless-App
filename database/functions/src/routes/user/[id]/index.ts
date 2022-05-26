import {Router} from "express";
import admin, {
  db,
  groupCollection,
  userCollection,
} from "../../../firebase-service";
import {isAuthorized} from "../../../middlewares/authorize";

export const userIdRouter = Router();

userIdRouter.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  db.collection(userCollection).doc(userId).get()
      .then((user) => {
        if (!user.exists) throw new Error("User not found");
        res.status(200).json({id: user.id, data: user.data()});
      })
      .catch((error) => res.status(500).send(error));
});

userIdRouter.delete("/:userId", isAuthorized({hasRole: ["admin"]}), async (req, res) => {
  admin.auth().deleteUser(req.params.userId).catch((error) => res.status(500).send(error));
  db.collection(userCollection).doc(req.params.userId).delete()
      .then(() => {
        db.collection(groupCollection).where("members", "array-contains", req.params.userId).get().then(
            (groups) => {
              groups.forEach((group) => {
                db.collection(groupCollection).doc(group.id).update({
                  members: admin.firestore.FieldValue.arrayRemove(req.params.userId),
                }).catch((error) => {
                  throw new Error(error);
                });
              });
            },
        );
        res.status(204).send("Document successfully deleted!");
      }).catch(function(error) {
        res.status(500).send(error);
      });
});

userIdRouter.put("/:userId", isAuthorized({
  hasRole: ["admin"],
  allowSameUser: true,
}), async (req, res) => {
  await db.collection(userCollection).doc(req.params.userId).set(req.body, {merge: true})
      .then(() => res.json({id: req.params.userId}))
      .catch((error) => res.status(500).send(error));
});
