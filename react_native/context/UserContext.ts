import { createContext } from "react";

export interface User {
  id: string;
  userName: string;
  birthday: Date;
  sex: string;
  job: string;
}

export const UserContext = createContext({});
