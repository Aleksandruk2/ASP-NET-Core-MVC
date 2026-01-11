import type { IGoogleCredentialResponse } from "../../Interfaces/IGoogleCreditialResponse.ts";
import {GoogleLogin} from "@react-oauth/google";
import APP_ENV from "../../env";
import {useAuth} from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import Login from "../../components/Account/Login/Login.tsx";
import {useEffect} from "react";

const LoginPage = () => {
    const navigate = useNavigate();

    const { login } = useAuth();
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        if(isAuthenticated)
            navigate("/Profile");
    },[isAuthenticated, navigate]);

    
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
            <div className="flex items-center justify-center w-full">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-3">
                        <GoogleLogin
                            onSuccess={handleLogin}
                            onError={() => console.log('Login Failed')}
                            ux_mode="popup"
                            type="standard"
                            size="large"
                            width={256}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Login/>
            </div>
        </>
    );
}

export default LoginPage;