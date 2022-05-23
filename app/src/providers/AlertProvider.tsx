import React, { createContext, useContext, useState, useCallback } from 'react';
import DropdownAlert from 'react-native-dropdownalert';

const AlertContext = createContext<{
  setAlert: (alert: {
    color?: string;
    title?: string;
    message?: string;
  }) => void;
}>({
  setAlert() {},
});

type Props = {
  children?: React.ReactNode;
};

export const AlertProvider = ({ children }: Props) => {
  const [dropDownAlertRef, setDropDownAlertRef] =
    useState<DropdownAlert | null>();

  const setAlert = useCallback(
    ({ color = 'success', title = 'Notification', message = '' }) => {
      dropDownAlertRef?.alertWithType(color, title, message);
    },
    [dropDownAlertRef],
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      <DropdownAlert
        ref={ref => setDropDownAlertRef(ref)}
        updateStatusBar={false}
      />
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export default useAlert;
