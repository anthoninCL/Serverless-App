import {Channel} from "./Channel";
import {User} from "./User";

export type Team = {
  id: string;
  name: string;
  members: User[] | Array<string>;
  channels: Channel[] | Array<string>;
  photo: string;
};
