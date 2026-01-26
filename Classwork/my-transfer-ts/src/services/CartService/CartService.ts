import APP_ENV from "../../env";
import type {ICartItem} from "../../Interfaces/ICartItem/ICartItem.ts";

export const CartAddUpdate = async (props: ICartItem) => {
    const request: {
        transportationId: number;
        quantity: number;
    } = {
        transportationId: props.transportations!.id,
        quantity: props.quantity,
    }

    const token = localStorage.getItem("jwt");
    if (token) {
        try {
            const res = await fetch(APP_ENV.API_BASE_URL + "/api/Carts/AddUpdate", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            const text = await res.text();

            const data = text ? JSON.parse(text) : null;
            return data;
        } catch (err) {
            console.error(err);
        }
    }
}

export const CartGetList = async () => {
    const token = localStorage.getItem("jwt");
    if(token) {
        try {
            const res = await fetch(APP_ENV.API_BASE_URL + `/api/Carts/GetList`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                console.error("Cart list request failed.");
            }

            const data = await res.json();
            // console.log("Cart data from backend:", data);
            return data;

        } catch (err) {
            console.error(err);
        }
    }

}