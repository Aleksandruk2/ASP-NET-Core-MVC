import APP_ENV from "../../env";

export const ForgotPasswordAsync = async (email: string) => {
    try {
            const res = await fetch(APP_ENV.API_BASE_URL + "/api/Account/ForgotPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        });

        if (!res.ok) {
            console.error("Forgot password request failed.");
        }
    } catch (err) {
        console.error(err);
    }
}