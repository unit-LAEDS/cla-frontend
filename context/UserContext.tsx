import React, { createContext, useEffect, useState } from "react";
import { laedsGetUser } from "services";

type UserContextType = {
  reloadSession: () => void;
};

export const UserContext = createContext({} as UserContextType);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <UserContext.Provider value={{ reloadSession }}>
      {children}
    </UserContext.Provider>
  );
};
