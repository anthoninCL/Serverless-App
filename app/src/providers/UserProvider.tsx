import React, { createContext, useMemo, useState, useCallback } from "react";
import { User } from "../types/User";
import fetchJSON from "../utils/fetchJSON";

type UserProps = {
  users: User[];
  isFetching: boolean;
  fetchUsers: () => {};
};

export const UserContext = createContext<UserProps>({} as UserProps);

type Props = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `user`,
        method: "GET",
      });

      const tmpList = [];
      res.forEach((user) => {
        user["data"].id = user["id"];
        tmpList.push(user["data"]);
      });

      setIsFetching(false);
      setUsers(tmpList);
      return res;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  }, []);

  const value: UserProps = useMemo(
    () => ({
      users,
      isFetching,
      fetchUsers,
    }),
    [users, isFetching, fetchUsers]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
