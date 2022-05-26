import * as admin from "firebase-admin";

admin.initializeApp();

export const db = admin.firestore();

export const userCollection = "users";
export const roleCollection = "roles";
export const groupCollection = "groups";
export const teamCollection = "teams";
export const channelCollection = "channels";
export const messageCollection = "messages";
export const postCollection = "posts";
export const friendCollection = "friends";

export default admin;
