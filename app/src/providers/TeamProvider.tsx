import React, { createContext, useCallback, useMemo, useState } from "react";
import { Team } from "../types/Team";
import { useTranslation } from "react-i18next";
import fetchJSON from "../utils/fetchJSON";
import {formatData} from "../utils/formatData";

type TeamProps = {
  teams: Team[];
  isFetching: boolean;
  fetchTeams: () => {};
  createTeam: () => {};
}

export const TeamContext = createContext<TeamProps>({} as TeamProps);

type Props = {
  children: React.ReactNode;
}

export const TeamProvider = ({children}: Props) => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<Team[]>([])
  const [isFetching, setIsFetching] = useState(false);

  const fetchTeams = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: 'GET',
      })
      const formatedRes = formatData(res);
      setTeams(formatedRes as unknown as Team[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    } return null;
  }, []);

  const refreshTeams = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: 'GET',
      })
      const formatedRes = formatData(res);
      setTeams(formatedRes as unknown as Team[]);
      setIsFetching(false);

      return formatedRes;
    } catch (e) {
      console.log(e);
    } return null;
  }, []);

  const createTeam = useCallback(async (
    name: string, members: Array<string>
  ) => {
    const payload = {
      name,
      members
    }
    try {
      await fetchJSON({
        url: `team`,
        method: 'POST',
        payload
      })
      await refreshTeams();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const value: TeamProps = useMemo(
    () => ({
      teams,
      isFetching,
      fetchTeams,
      createTeam
  }), [
      teams,
      isFetching,
      fetchTeams,
      createTeam
      ]);

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
};
