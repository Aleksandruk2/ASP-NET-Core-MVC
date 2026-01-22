import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {IAuthUser} from "../../Interfaces/IAuth/IAuthUser.ts";
import {jwtDecode} from "jwt-decode";

const getUserFromToken = (token: string | null) : IAuthUser | null => {
    if (!token) {
        return null;
    }

    try {
        const decode = jwtDecode<IAuthUser>(token);
        return decode ?? null;
    } catch (err) {
        console.error("Invalid token",err);
        return null;
    }
}

const token = localStorage.getItem("token");
const user = getUserFromToken(token);

const initialState = {
    user: user,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            const user = getUserFromToken(action.payload);
            if (user) {
                state.user = user;
                localStorage.token = action.payload;
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;