import {Router} from "express";
import admin, {
  db,
  groupCollection,
  userCollection,
} from "../../../firebase-service";
import {User} from "../../../types";


export const signupRouter = Router();

signupRouter.post("/signup", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name ||
      !req.body.firstName || !req.body.lastName || !req.body.photo) {
      throw new Error("Email and password are required");
    }
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
      res.status(201).send({id: userRecord.uid});
    }).catch((error) => {
      res.status(500).send(error);
    });
  } catch (error) {
    res.status(400).send("User should contain name, firstName, lastName, email, password and photo!");
  }
});
