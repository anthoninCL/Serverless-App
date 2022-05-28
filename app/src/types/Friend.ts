import { User } from "./User";

export type Friend = {
  id: string;
  users: [string, string];
  createdAt: Date;
  updatedAt: Date;
  messages: string[] | null;
};
