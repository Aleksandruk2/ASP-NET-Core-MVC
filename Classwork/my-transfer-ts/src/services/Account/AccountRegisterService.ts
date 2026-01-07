import APP_ENV from "../../env";
import type {IAccountRegister} from "../../Interfaces/IAccount/IAccountRegister.ts";

export const AccountRegisterAsync = async (props: IAccountRegister) => {
    try {
        const formData = new FormData();
        formData.append("firstName", props.firstName);
        formData.append("lastName", props.lastName);
        formData.append("email", props.email);
        formData.append("password", props.password);
        formData.append("passwordConfirm", props.passwordConfirm);
        if (props.image)
            formData.append("image", props.image);
        const res = await fetch(APP_ENV.API_BASE_URL + "/api/Account/Register", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        // console.log(data);
        // console.log("JWT from backend:", data.token);
        return data;
    } catch (err) {
        console.error(err);
    }
}