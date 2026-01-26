import type {ITransportationsItem} from "../ITransportations/ITransportationsItem.ts";

export interface ICartItem {
    quantity: number;
    transportations: ITransportationsItem | null;
}