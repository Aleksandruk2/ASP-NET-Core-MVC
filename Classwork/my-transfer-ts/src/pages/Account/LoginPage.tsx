import type { IGoogleCredentialResponse } from "../../Interfaces/IGoogleCreditialResponse.ts";
import {GoogleLogin} from "@react-oauth/google";
import APP_ENV from "../../env";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import Login from "../../components/Account/Login/Login.tsx";

const LoginPage = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    
    const handleLogin = async (credentialResponse: IGoogleCredentialResponse) => {
        try {
            if (!credentialResponse.credential) return;
            const idToken = credentialResponse.credential;
            // console.log(idToken);

            const res = await fetch(APP_ENV.API_BASE_URL + "/api/Auth/Google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idToken })
            });

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();
            // console.log("JWT from backend:", data.token);

            await login(data.token);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <div className="flex justify-center items-center min-h-[calc(100vh-75px)]">
                <div className="bg-blue-100 dark:bg-gray-800 shadow-md rounded-lg p-8 my-2 py-4">
                    <div className="grid grid-cols-1">
                        <div className="sm:col-span-3 flex justify-center items-center">
                            <GoogleLogin
                                onSuccess={handleLogin}
                                onError={() => console.log('Login Failed')}
                                ux_mode="popup"
                                type="standard"
                                size="large"
                                width={256}
                            />
                        </div>
                        <div>
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;