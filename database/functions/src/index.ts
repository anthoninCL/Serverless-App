import * as functions from "firebase-functions";
import * as express from "express";
import {
  authenticationRouter,
  friendRouter,
  teamRouter,
  userRouter,
} from "./routes";
import * as bodyParser from "body-parser";
import {db, groupCollection, roleCollection} from "./firebase-service";
import cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1", authenticationRouter);
app.use("/api/v1", friendRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", teamRouter);

db.collection(roleCollection).get().then(
    async (querySnapshot) => {
      if (querySnapshot.empty) {
        await db.collection(roleCollection).doc("admin").set({
          name: "admin",
          description: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await db.collection(roleCollection).doc("manager").set({
          name: "manager",
          description: "Manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await db.collection(roleCollection).doc("user").set({
          name: "user",
          description: "User",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    },
);

db.collection(groupCollection).get().then(
    async (querySnapshot) => {
      if (querySnapshot.empty) {
        await db.collection(groupCollection).doc("admins").set({
          name: "admins",
          description: "Administrators",
          createdAt: new Date(),
          updatedAt: new Date(),
          roles: ["admin"],
          members: [],
        });
        await db.collection(groupCollection).doc("managers").set({
          name: "managers",
          description: "Managers",
          createdAt: new Date(),
          updatedAt: new Date(),
          roles: ["manager"],
          members: [],
        });
        await db.collection(groupCollection).doc("users").set({
          name: "users",
          description: "Users",
          createdAt: new Date(),
          updatedAt: new Date(),
          roles: ["user"],
          members: [],
        });
      }
    },
);

export const webApi = functions.region("europe-west1").https.onRequest(app);
