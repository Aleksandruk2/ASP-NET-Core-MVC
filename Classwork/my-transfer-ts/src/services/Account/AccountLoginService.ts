import type {IAccountLogin} from "../../Interfaces/IAccount/IAccountLogin.ts";
import APP_ENV from "../../env";

export const AccountLoginAsync = async (props: IAccountLogin) => {
    try {
        const res = await fetch(APP_ENV.API_BASE_URL + "/api/Account/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(props),
        });

        if (!res.ok) {
            // throw new Error("SERVER_ERROR");
            return res;
        }

        const data = await res.json();
        // console.log("JWT from backend:", data.token);

        return data;
    } catch (err) {
        console.error(err);
    }

}