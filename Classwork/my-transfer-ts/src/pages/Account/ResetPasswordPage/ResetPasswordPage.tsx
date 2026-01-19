import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import {ResetPasswordAsync} from "../../../services/Account/ResetPasswordService.ts";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    if (!token || !email) {
        return <Navigate to="/forgot-password" replace/>;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const result = await ResetPasswordAsync({
                email: email,
                token: token,
                newPassword: password,
                confirmNewPassword: confirmPassword
            });
            console.log(result)
            if(result)
                navigate("/Login", {
                    replace: true,
                    state: {success: "Пароль успішно змінено"}
                });
            else
                setError("Посилання для відновлення пароля недійсне або застаріле. " +
                    "Будь ласка, надішліть запит ще раз.");
        } catch {
            console.error("Reset password error");
        }
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={onSubmit}>
                    <h2 className="text-base/7 font-semibold text-white">Відновленя паролю</h2>
                    <p className="mt-1 text-sm/6 text-gray-400">Будь ласка, введіть та підтвердіть ваш новий пароль.</p>
                    <div className="mt-10">
                        <div className="sm:col-span-3 mb-2 min-w-64">
                            <label className="block text-sm/6 font-medium text-white">
                                Новий пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm/6 font-medium text-white">
                                Підтвердіть новий пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        {error && (<div className="text-red-400 max-w-72">{error}</div>)}
                        {error && (<div className="pt-2">
                            <button className="text-blue-200 hover:underline hover:text-blue-500" onClick={() => navigate("/forgot-password", {replace: true})}>
                                Надіслати новий запит
                            </button>
                        </div>)}
                    </div>
                    <div className="pb-3 mt-6 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Відновити пароль
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ResetPasswordPage;