import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import type {IAuthUser} from "../../Interfaces/IAuth/IAuthUser.ts";
import APP_ENV from "../../env";
import {AuthContext} from "./AuthContext.ts";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<IAuthUser | null>(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const token = localStorage.getItem("jwt");
    const isAuthenticated = !!user;
    const isAdmin = !!user?.roles?.includes('Admin');

    const logout = useCallback(() => {
        localStorage.removeItem("jwt");
        setUser(null);
    }, []);

    const fetchProfile = useCallback(async (jwt: string) => {
        try {
            const result = await fetch(APP_ENV.API_BASE_URL + "/api/Auth/Profile", {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            if (!result.ok) {
                logout();
                return;
            }

            const data = await result.json();
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }, [logout]);

    const login = useCallback( async (jwt: string) => {
        localStorage.setItem("jwt", jwt);
        // console.log("Вхід через login");
        await fetchProfile(jwt);
    }, [fetchProfile]);

    useEffect(() => {
        if(!token) {
            console.log("Токен пустий, вихід із useEffect")
            setIsAuthChecked(true);
            return;
        }
        if(token && !user) {
            // console.log("Вхід через useEffect");
            (async () => {
                try {
                    await fetchProfile(token);
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsAuthChecked(true);
                }
            })();
        }
    }, [token, fetchProfile, user]);



    return (
        <AuthContext.Provider value={{user, isAuthenticated, isAuthChecked, isAdmin, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
};