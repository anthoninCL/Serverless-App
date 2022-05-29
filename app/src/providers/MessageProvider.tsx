import React, {createContext, useCallback, useMemo, useState} from "react";
import {Message} from "../types/Message";
import fetchJSON from "../utils/fetchJSON";
import {formatData} from "../utils/formatData";

type MessageProps = {
  fetchChannelMessages: (currentTeam: string, channelId: string) => Message[];
  isMessagesFetching: boolean;
  sendChannelMessages: (currentTeam: string, channelId: string, content: string) => {};
  deleteChannelMessages: (currentTeam: string, channelId: string, messageId: string) => {};
  updateChannelMessages: (currentTeam: string, channelId: string, messageId: string, content: string) => {};
};

export const MessageContext = createContext<MessageProps>({} as MessageProps);

type Props = {
  children: React.ReactNode;
};

export const MessageProvider = ({children}: Props) => {
  const [isMessagesFetching, setIsMessagesFetching] = useState(false);

  const fetchChannelMessages = useCallback(async (currentTeam: string, channelId: string) => {
    try {
      setIsMessagesFetching(true);
      const res = await fetchJSON({
        url: `team/${currentTeam}/channel/${channelId}/message`,
        method: "GET",
      });

      const formatedRes = formatData(res);
      setIsMessagesFetching(false);
      return formatedRes;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const sendChannelMessages = useCallback(async (currentTeam: string, channelId: string, content: string) => {
    try {
      const payload = {
        content
      };
      await fetchJSON({
        url: `team/${currentTeam}/channel/${channelId}/message`,
        method: "POST",
        payload
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateChannelMessages = useCallback(async (currentTeam: string, channelId: string, messageId: string, content: string) => {
    try {
      const payload = {
        content
      };
      await fetchJSON({
        url: `team/${currentTeam}/channel/${channelId}/message/${messageId}`,
        method: "PUT",
        payload
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deleteChannelMessages = useCallback(async (currentTeam: string, channelId: string, messageId: string) => {
    try {
      await fetchJSON({
        url: `team/${currentTeam}/channel/${channelId}/message/${messageId}`,
        method: "DELETE",
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const value: MessageProps = useMemo(
    () => ({
      fetchChannelMessages,
      isMessagesFetching,
      sendChannelMessages,
      updateChannelMessages,
      deleteChannelMessages
    }),
    [fetchChannelMessages, isMessagesFetching, sendChannelMessages, updateChannelMessages, deleteChannelMessages]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
