import type {IAuthUser} from "./IAuthUser.ts";

export interface IAuthContext {
    user: IAuthUser | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}