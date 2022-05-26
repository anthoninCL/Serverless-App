import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
  return (req: Request, res: Response, next: Function) => {
    const { roles, uid } = res.locals
    const { userId } = req.params

    console.log(userId)
    if (opts.allowSameUser && userId && uid === userId)
      return next();

    if (!roles)
      return res.status(403).send("Wrong roles");

    if (opts.hasRole.some(role => roles.includes(role)))
      return next();

    return res.status(403).send("Wrong roles");
  }
}