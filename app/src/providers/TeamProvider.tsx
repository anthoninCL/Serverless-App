import React, { createContext, useCallback, useMemo, useState } from "react";
import { Team } from "../types/Team";
import { useTranslation } from "react-i18next";
import fetchJSON from "../utils/fetchJSON";

type TeamProps = {
  team: Team;
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
  const [team, setTeam] = useState<Team>()
  const [isFetching, setIsFetching] = useState(false);

  const fetchTeams = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: 'GET',
      })
      setIsFetching(false);
      setTeam(res);
      return res;
    } catch (e) {
      console.log(e);
    } return null;
  }, []);

  const createTeam = useCallback(async (
    name: string
  ) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `team`,
        method: 'GET',
      })
      setIsFetching(false);
      setTeam(res);
      return res;
    } catch (e) {
      console.log(e);
    } return null;
  }, []);

  const value: TeamProps = useMemo(
    () => ({
      team,
      isFetching,
      fetchTeams,
      createTeam
  }), [
      team,
      isFetching,
      fetchTeams,
      createTeam
      ]);

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
};
