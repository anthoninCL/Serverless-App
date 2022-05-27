import { User } from "./User";

export type friend = {
  users: [string, string];
  createdAt: Date;
  updatedAt: Date;
  messages: [string];
};
