import React, { createContext, useMemo, useState, useCallback } from "react";
import { Friend } from "../types/Friend";
import fetchJSON from "../utils/fetchJSON";
import { formatData } from "../utils/formatData";

type FriendProps = {
  friends: Friend[];
  isFetching: boolean;
  fetchFriends: () => {};
  addFriend: (id: string) => {};
  deleteFriend: (id: string) => {};
};

export const FriendContext = createContext<FriendProps>({} as FriendProps);

type Props = {
  children: React.ReactNode;
};

export const FriendProvider = ({ children }: Props) => {
  const [friends, setFriends] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Get list of teams
  const fetchFriends = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `friend`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setFriends(formatedRes as unknown as Friend[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  const addFriend = useCallback(async (id: string) => {
    const payload = {
      id,
    };
    try {
      await fetchJSON({
        url: `friend`,
        method: "POST",
        payload,
      });
      await fetchFriends();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteFriend = useCallback(async (id: string) => {
    try {
      await fetchJSON({
        url: `friend/${id}`,
        method: "DELETE",
      });
      await fetchFriends();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const value: FriendProps = useMemo(
    () => ({
      friends,
      isFetching,
      fetchFriends,
      addFriend,
      deleteFriend,
    }),
    [friends, isFetching, fetchFriends, addFriend, deleteFriend]
  );

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};
