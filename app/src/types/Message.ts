import {User} from "./User";

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User | string;
};
