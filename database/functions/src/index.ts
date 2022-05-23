import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.region("europe-west1").https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  await admin.firestore().collection('test').add({ testMessage: "some message" });
  response.send("Hello from Firebase!");
});
