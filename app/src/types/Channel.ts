import {Post} from "./Post";
import {Message} from "./Message";

export type Channel = {
  id: string;
  name: string;
  createdAt: string;
  posts: Post[] | Array<string> | null;
  messages: Message[] | Array<string> | null;
}
