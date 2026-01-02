import {createContext} from "react";
import type {IAuthContext} from "../../Interfaces/IAuth/IAuthContext.ts";

export const AuthContext = createContext<IAuthContext | null>(null);