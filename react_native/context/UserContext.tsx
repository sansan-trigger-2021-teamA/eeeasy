import React, { createContext, useState } from "react";

export interface User {
  id: string;
  userName: string;
  birthday: Date;
  sex: string;
  job: string;
}

const defaultUser: User = {
  id: "fafsda",
  userName: "default",
  birthday: new Date(),
  sex: "男性",
  job: "学生",
};

type userContextProps = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<userContextProps>({
  user: defaultUser,
  setUser: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
