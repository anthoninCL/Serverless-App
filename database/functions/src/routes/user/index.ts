import {Router} from "express";
import admin, {
  db,
  groupCollection,
  userCollection,
} from "../../firebase-service";
import {User} from "../../types";
import {userIdRouter} from "./[id]";
import {isAuthenticated} from "../../middlewares/authenticate";
import {isAuthorized} from "../../middlewares/authorize";


export const userRouter = Router();

userRouter.use("/user", isAuthenticated);
userRouter.use("/user", userIdRouter);

userRouter.get("/user", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection(userCollection).get();
    const users: any[] = [];
    userQuerySnapshot.forEach(
        (doc) => {
          users.push({
            id: doc.id,
            data: doc.data(),
          });
        },
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post("/user", isAuthorized({hasRole: ["admin"]}),
    async (req, res) => {
      try {
        const user: User = {
          name: req.body.name,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          photo: req.body.photo,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await admin.auth().createUser({
          email: user.email,
          emailVerified: true,
          password: req.body["password"],
          displayName: user.name,
        }).then(async (userRecord) => {
          console.log("Successfully created new user:", userRecord.uid);
          await db.collection(userCollection).doc(userRecord.uid).set(user);
          await db.collection(groupCollection).doc("users").update({
            updatedAt: new Date(),
            members: admin.firestore.FieldValue.arrayUnion(userRecord.uid),
          });
          console.log("User added to database");
          res.status(201).send(`Created a new user: ${userRecord.uid}`);
        }).catch((error) => {
          res.status(500).send(error);
        });
      } catch (error) {
        res.status(400).send("User should contain name, firstName, " +
      "lastName, email, password and photo!");
      }
    });
