import React, { createContext, useCallback, useMemo, useState } from "react";
import { Channel } from "../types/Channel";
import { useTranslation } from "react-i18next";
import fetchJSON from "../utils/fetchJSON";
import { formatData, formatSimpleData } from "../utils/formatData";

type ChannelProps = {
  channel: Channel;
  channels: Channel[];
  isFetching: boolean;
  fetchChannel: (teamId: string, id: string) => {};
  fetchChannels: (teamId: string) => {};
  createChannel: (teamId: string, name: string) => {};
  updateChannel: (teamId: string, id: string, name?: string,       messages?: Array<string>, posts?: Array<string>,) => {};
  deleteChannel: (teamId: string, id: string) => {};
  refreshChannels: (teamId: string) => {};
};

export const ChannelContext = createContext<ChannelProps>({} as ChannelProps);

type Props = {
  children: React.ReactNode;
};

export const ChannelProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const [channel, setChannel] = useState<Channel>();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch one channel by id
  const fetchChannel = useCallback(async (teamId: string, id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `${teamId}/channel/${id}`,
        method: "GET",
      });
      const formatedRes = formatSimpleData(res);
      setChannel(formatedRes as unknown as Channel);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Get list of channels
  const fetchChannels = useCallback(async (teamId: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `${teamId}/channel`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setChannels(formatedRes as unknown as Channel[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Refresh channels list
  const refreshChannels = useCallback(async (teamId: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `${teamId}/channel`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setChannels(formatedRes as unknown as Channel[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  const createChannel = useCallback(
    async (teamId: string, name: string) => {
      const payload = {
        name,
      };
      try {
        await fetchJSON({
          url: `${teamId}/channel`,
          method: "POST",
          payload,
        });
        await refreshChannels(teamId);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateChannel = useCallback(
    async (
      teamId: string,
      id: string,
      name?: string,
      messages?: Array<string>,
      posts?: Array<string>,
    ) => {
      const payload = {
        name,
        messages,
        posts,
      };
      try {
        await fetchJSON({
          url: `${teamId}/channel/${id}`,
          method: "PUT",
          payload,
        });
        await refreshChannels(teamId);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // Delete one channel by id
  const deleteChannel = useCallback(async (teamId: string, id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `${teamId}/channel/${id}`,
        method: "DELETE",
      });
      setIsFetching(false);
      return true;
    } catch (e) {
      console.log(e.message);
    }
    return false;
  }, []);

  const value: ChannelProps = useMemo(
    () => ({
      channel,
      channels,
      isFetching,
      fetchChannel,
      fetchChannels,
      createChannel,
      updateChannel,
      deleteChannel,
      refreshChannels,
    }),
    [
      channel,
      channels,
      isFetching,
      fetchChannel,
      fetchChannels,
      createChannel,
      updateChannel,
      deleteChannel,
      refreshChannels,
    ]
  );

  return <ChannelContext.Provider value={value}>{children}</ChannelContext.Provider>;
};
