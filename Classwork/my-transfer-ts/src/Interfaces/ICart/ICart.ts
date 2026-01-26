import type {ICartItem} from "../ICartItem/ICartItem.ts";

export interface ICart {
    add(newItem: ICartItem): void;
}