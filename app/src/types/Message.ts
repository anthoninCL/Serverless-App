import {User} from "./User";

export type Message = {
  id: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  user: User | string;
};
