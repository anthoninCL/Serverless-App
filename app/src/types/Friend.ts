import {User} from "./User";

export type Friend = {
  friendId: User | string;
  userId: User | string;
  createdAt: string;
};
