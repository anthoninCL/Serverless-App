import { Router } from "express";
import { db, teamCollection } from "../../../firebase-service";
import { isAuthorized } from "../../../middlewares/authorize";

export const teamIdRouter = Router();

teamIdRouter.get("/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  db.collection(teamCollection).doc(teamId).get()
    .then(team => {
      if(!team.exists) throw new Error('Team not found');
      if (team.data()?.members.includes(res.locals.uid) || res.locals.role == "admin") {
        res.status(200).json({id:team.id, data:team.data()});
      } else {
        throw new Error('Not authorized');
      }
    }).catch(error => res.status(500).send(error));
});

teamIdRouter.delete("/:teamId", isAuthorized({hasRole: ["admin"]}), async (req, res) => {
  db.collection(teamCollection).doc(req.params.teamId).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
      res.status(500).send(error);
    });
});

teamIdRouter.put("/:teamId", isAuthorized({hasRole: ["admin"]}), async (req, res) => {
  await db.collection(teamCollection).doc(req.params.teamId).set(req.body,{merge:true})
    .then(()=> res.json({id:req.params.teamId}))
    .catch((error)=> res.status(500).send(error))
});