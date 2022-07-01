import { createContext } from "react";
import IUser from "../interfaces/user.interface";

export const AuthContext = createContext<IUser>({ uid: "", email: "" });
