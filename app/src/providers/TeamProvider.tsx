import React, { createContext, useCallback, useMemo, useState } from "react";
import { Team } from "../types/Team";
import { useTranslation } from "react-i18next";
import fetchJSON from "../utils/fetchJSON";
import { formatData, formatSimpleData } from "../utils/formatData";

type TeamProps = {
  team: Team;
  teams: Team[];
  isFetching: boolean;
  fetchTeam: (id: string) => {};
  fetchTeams: () => {};
  createTeam: (name: string, members: Array<string>) => {};
  updateTeam: (id: string, name?: string, members?: Array<string>, channels?: Array<string>, photo?: string) => {};
  deleteTeam: (id: string) => {};
  refreshTeams: () => {};
};

export const TeamContext = createContext<TeamProps>({} as TeamProps);

type Props = {
  children: React.ReactNode;
};

export const TeamProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const [team, setTeam] = useState<Team>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch one team by id
  const fetchTeam = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team/${id}`,
        method: "GET",
      });
      const formatedRes = formatSimpleData(res);
      setTeam(formatedRes as unknown as Team);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Get list of teams
  const fetchTeams = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setTeams(formatedRes as unknown as Team[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  // Refresh teams list
  const refreshTeams = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: "GET",
      });
      const formatedRes = formatData(res);
      setTeams(formatedRes as unknown as Team[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    }
    return null;
  }, []);

  const createTeam = useCallback(
    async (name: string, members: Array<string>) => {
      const payload = {
        name,
        members,
      };
      try {
        await fetchJSON({
          url: `team`,
          method: "POST",
          payload,
        });
        await refreshTeams();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateTeam = useCallback(
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
          url: `team/${id}`,
          method: "PUT",
          payload,
        });
        await refreshTeams();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // Delete one team by id
  const deleteTeam = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team/${id}`,
        method: "DELETE",
      });
      setIsFetching(false);
      return true;
    } catch (e) {
      console.log(e.message);
    }
    return false;
  }, []);

  const value: TeamProps = useMemo(
    () => ({
      team,
      teams,
      isFetching,
      fetchTeam,
      fetchTeams,
      createTeam,
      updateTeam,
      deleteTeam,
      refreshTeams,
    }),
    [
      team,
      teams,
      isFetching,
      fetchTeam,
      fetchTeams,
      createTeam,
      updateTeam,
      deleteTeam,
      refreshTeams,
    ]
  );

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};
