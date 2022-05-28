import {User} from "../types/User";
import {getStoredData} from "./fnAsyncStorage";

export const FriendName = async (friends: string[], users: User[]) => {
  const uid = await getStoredData("uid");
  const idx = friends.indexOf(uid);
  if (idx != -1) {
    friends.splice(idx, 1);
  }
  const indexUser = users.map((user: User) => user.id).indexOf(friends[0]);
  if (indexUser != -1) {
    return users[indexUser].name;
  }
  return "";
};
