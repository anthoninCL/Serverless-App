import React, { createContext, useMemo, useState, useCallback } from "react";
import { Friend } from "../types/Friend";
import fetchJSON from "../utils/fetchJSON";
import { formatData } from "../utils/formatData";
import {Message} from "../types/Message";

type FriendProps = {
  friends: Friend[];
  isFetching: boolean;
  fetchFriends: () => {};
  addFriend: (id: string) => {};
  deleteFriend: (id: string) => {};
  fetchFriendMessages: (friendId: string) => Message[];
  isMessagesFetching: boolean;
  sendFriendMessages: (friendId: string, content: string) => {};
  deleteFriendMessages: (friendId: string, messageId: string) => {};
  updateFriendMessages: (friendId: string, messageId: string, content: string) => {};
};

export const FriendContext = createContext<FriendProps>({} as FriendProps);

type Props = {
  children: React.ReactNode;
};

export const FriendProvider = ({ children }: Props) => {
  const [friends, setFriends] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isMessagesFetching, setIsMessagesFetching] = useState(false);

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

  const fetchFriendMessages = useCallback(async (friendId: string) => {
    try {
      setIsMessagesFetching(true);
      const res = await fetchJSON({
        url: `friend/${friendId}/message`,
        method: "GET",
      });

      const formatedRes = formatData(res);
      setIsMessagesFetching(false);
      return formatedRes;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sendFriendMessages = useCallback(async (friendId: string, content: string) => {
    try {
      const payload = {
        content
      };
      await fetchJSON({
        url: `friend/${friendId}/message`,
        method: "POST",
        payload
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateFriendMessages = useCallback(async (friendId: string, messageId: string, content: string) => {
    try {
      const payload = {
        content
      };
      await fetchJSON({
        url: `friend/${friendId}/message/${messageId}`,
        method: "PUT",
        payload
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteFriendMessages = useCallback(async (friendId: string, messageId: string) => {
    try {
      await fetchJSON({
        url: `friend/${friendId}/message/${messageId}`,
        method: "DELETE",
      });
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
      fetchFriendMessages,
      isMessagesFetching,
      sendFriendMessages,
      updateFriendMessages,
      deleteFriendMessages
    }),
    [friends, isFetching, fetchFriends, addFriend, deleteFriend, fetchFriendMessages, isMessagesFetching, sendFriendMessages, updateFriendMessages, deleteFriendMessages]
  );

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};
