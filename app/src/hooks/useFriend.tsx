import { useContext } from "react";
import { FriendContext } from "providers/FriendProvider";

export const useFriend = () => useContext(FriendContext);

export default useFriend;
