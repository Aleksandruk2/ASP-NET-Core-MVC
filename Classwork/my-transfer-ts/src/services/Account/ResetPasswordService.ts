import APP_ENV from "../../env";
import type {IResetPassword} from "../../Interfaces/IAccount/IResetPassword.ts";

export const ResetPasswordAsync = async (props: IResetPassword) => {
    try {
        const res = await fetch(APP_ENV.API_BASE_URL + "/api/Account/ResetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
        });

        if (!res.ok) {
            console.error("Forgot password request failed.");
            return false;
        }

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}