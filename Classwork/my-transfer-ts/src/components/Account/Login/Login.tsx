import {useState} from "react";
import {AccountLoginAsync} from "../../../services/Account/AccountLoginService.ts";
import * as React from "react";
import {useAuth} from "../../../hooks/useAuth.ts";
import {NavLink, useNavigate} from "react-router-dom";
// import {loginSuccess} from "../../../services/AuthSliceService/AuthSliceService.ts";
// import {useAppDispatch} from "../../../store";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | undefined>();

    // const appDispatch = useAppDispatch();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = await AccountLoginAsync({ email, password });
        setError(undefined);

        if (!data.token) {
            const err = await data.text();
            setError(err);
            return;
        }

        // appDispatch(loginSuccess(data.token));
        await login(data.token);
        navigate("/");
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={onSubmit}>
                    <div className="mt-10">
                        <div className="sm:col-span-3 mb-2 w-64">
                            <label className="block text-sm/6 font-medium text-white">
                                Електрона адреса
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm/6 font-medium text-white">
                                Пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {error && (<div className="text-red-400 max-w-72">{error}</div>)}
                        </div>
                        <div className="sm:col-span-3 pt-3">
                            <NavLink
                                className="cursor-pointer text-blue-200 hover:underline hover:text-blue-500"
                                to="/forgot-password">Забув пароль</NavLink>
                        </div>
                    </div>
                    <div className="pb-3 mt-6 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Увійти
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;