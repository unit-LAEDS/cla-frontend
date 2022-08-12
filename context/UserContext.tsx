import React, { createContext, useEffect, useState } from "react";
import { laedsGetUser, LaedsUser } from "services";

type UserContextType = {
  laedsUser: LaedsUser | undefined;
  reloadSession: () => void;
  updateUserInfo: () => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [laedsUser, setLaedsUser] = useState<LaedsUser>();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const updateUserInfo = async () => {
    const response = await laedsGetUser();

    setLaedsUser(response);
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ laedsUser, reloadSession, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
