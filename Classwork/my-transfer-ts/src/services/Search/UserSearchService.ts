import APP_ENV from "../../env";
import type {IUserSearch} from "../../Interfaces/ISearch/IUserSearch.ts";

export const UserSearchAsync = async (props: IUserSearch) => {
    try {
        const toQueryString = (params: IUserSearch): string => {
            return Object.entries(params)
                .filter(([_, value]) => value !== undefined && value !== null)
                .map(([key, value]) => {
                    const val = value instanceof Date ? value.toISOString() : value;
                    return `${encodeURIComponent(key)}=${encodeURIComponent(val as string | number)}`;
                })
                .join("&");
        };

        const queryString = toQueryString(props);
        const res = await fetch(APP_ENV.API_BASE_URL + `/api/Account/Search?${queryString}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("User search request failed.");
        }

        const data = await res.json();
        console.log("Search data from backend:", data);
        return data;
    } catch (err) {
        console.error(err);
    }
}