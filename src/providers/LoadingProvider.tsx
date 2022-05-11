import React, { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

type Loading = {
  dataLoading: any[];
  addDataLoading: (key: any) => void;
  removeDataLoading: (key: any) => void;
};

export const LoadingContext = createContext({} as Loading);

type Props = {
  children: React.ReactNode;
};

// 🚨 Put this BEFORE the provider you want to use PersistedState with
export const LoadingProvider = ({ children }: Props) => {
  const [dataLoading, setDataLoading] = useState<any>([]);

  const addDataLoading = useCallback(
    key => {
      setDataLoading((prevDataLoading: any) => [key, ...prevDataLoading]);
    },
    [setDataLoading],
  );

  const removeDataLoading = useCallback(
    key => {
      setDataLoading((prevDataLoading: any[]) => {
        const newData = [...prevDataLoading.filter(item => item !== key)];

        return newData;
      });
    },
    [setDataLoading],
  );

  return (
    <LoadingContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ dataLoading, addDataLoading, removeDataLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
