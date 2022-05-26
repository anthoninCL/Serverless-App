import {Role} from "./Role";
import {User} from "./User";

export type Group = {
  name: string;
  roles: Role[] | Array<string>;
  users: User[] |Array<string>;
};
