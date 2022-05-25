import * as functions from "firebase-functions";
import * as express from 'express';
import { authenticationRouter, userRouter } from "./routes";
import cors = require("cors");
import * as bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", authenticationRouter);
app.use("/api/v1", userRouter);

export const webApi = functions.region("europe-west1").https.onRequest(app);
