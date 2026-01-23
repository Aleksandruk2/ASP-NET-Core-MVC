import APP_ENV from "../../env";

export const TransportationsList = async () => {
    try {
        const res = await fetch(APP_ENV.API_BASE_URL + `/api/Transportations/GetList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("User search request failed.");
        }

        const data = await res.json();
        // console.log("Transportation data from backend:", data);
        return data;

    } catch (err) {
        console.error(err);
    }
}