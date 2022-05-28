import React, { createContext, useCallback, useMemo, useState } from "react";
import { Message } from "../types/Message";
import { useTranslation } from "react-i18next";
import fetchJSON from "../utils/fetchJSON";
import { formatData, formatSimpleData } from "../utils/formatData";

type MessageProps = {
  message: Message;
  messages: Message[];
  isFetching: boolean;
  fetchMessage: (id: string) => {};
  fetchMessages: () => {};
  createMessage: (name: string, members: Array<string>) => {};
  updateMessage: (id: string, name?: string, members?: Array<string>, channels?: Array<string>, photo?: string) => {};
  deleteMessage: (id: string) => {};
  refreshMessages: () => {};
};

export const MessageContext = createContext<MessageProps>({} as MessageProps);

type Props = {
  children: React.ReactNode;
};

export const MessageProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState<Message>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch one Message by id
  const fetchMessage = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `Message/${id}`,
        method: "GET",
      });
      const formatedRes = formatSimpleData(res);
      setMessage(formatedRes as unknown as Message);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Get list of Messages
  const fetchMessages = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `Message`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setMessages(formatedRes as unknown as Message[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Refresh Messages list
  const refreshMessages = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `Message`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setMessages(formatedRes as unknown as Message[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  const createMessage = useCallback(
    async (name: string, members: Array<string>) => {
      const payload = {
        name,
        members,
      };
      try {
        await fetchJSON({
          url: `Message`,
          method: "POST",
          payload,
        });
        await refreshMessages();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateMessage = useCallback(
    async (
      id: string,
      name?: string,
      members?: Array<string>,
      channels?: Array<string>,
      photo?: string
    ) => {
      const payload = {
        name,
        members,
        channels,
        photo,
      };
      try {
        await fetchJSON({
          url: `Message/${id}`,
          method: "PUT",
          payload,
        });
        await refreshMessages();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // Delete one Message by id
  const deleteMessage = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `Message/${id}`,
        method: "DELETE",
      });
      setIsFetching(false);
      return true;
    } catch (e) {
      console.log(e.message);
    }
    return false;
  }, []);

  const value: MessageProps = useMemo(
    () => ({
      message,
      messages,
      isFetching,
      fetchMessage,
      fetchMessages,
      createMessage,
      updateMessage,
      deleteMessage,
      refreshMessages,
    }),
    [
      message,
      messages,
      isFetching,
      fetchMessage,
      fetchMessages,
      createMessage,
      updateMessage,
      deleteMessage,
      refreshMessages,
    ]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};
