import type {IAuthUser} from "./IAuthUser.ts";

export interface IAuthContext {
    user: IAuthUser | null;
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}