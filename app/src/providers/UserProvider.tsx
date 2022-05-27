import React, { createContext, useMemo, useState, useCallback } from "react";
import { User } from "../types/User";
import fetchJSON from "../utils/fetchJSON";
import { formatData } from "../utils/formatData";

type UserProps = {
  users: User[];
  isFetching: boolean;
  fetchUsers: () => {};
  fetchUser: (id: string) => User;
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

      const formatedRes = formatData(res);
      setIsFetching(false);
      setUsers(formatedRes as unknown as User[]);
      return res;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  }, []);

  const fetchUser = useCallback(async (id: string) => {
    try {
      setIsFetching(true);
      const res = await fetchJSON({
        url: `user/${id}`,
        method: "GET",
      });

      const formatedRes = formatData(res);
      setIsFetching(false);
      return formatedRes;
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
      fetchUser,
    }),
    [users, isFetching, fetchUsers, fetchUser]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
