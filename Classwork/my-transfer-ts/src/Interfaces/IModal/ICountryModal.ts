import type {ICountry} from "../ICountry.ts";


export interface ICountryModal {
    country: ICountry;
    onOpen: boolean;
}