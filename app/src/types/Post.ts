import {Message} from "./Message";

export type Post = {
  id: string;
  title: string;
  message: Message | string;
};
