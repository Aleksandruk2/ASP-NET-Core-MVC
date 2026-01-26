import CartItemsTable from "./Tables/CartItemsTable.tsx";
import {ShoppingBasket} from "lucide-react";
import {useEffect, useState} from "react";
import {CartGetList} from "../../services/CartService/CartService.ts";
import type {ICartItemResult} from "../../Interfaces/ICartItem/ICartItemResult.ts";

const Cart = () => {
    const [list, setList] = useState<ICartItemResult[] | null>(null);

    useEffect(() => {
        (async () => {
            const data:ICartItemResult[] = await CartGetList();
            setList(data);
        })();
    }, []);

    return (
        <>
            <div className="p-4 md:p-6 mx-auto max-w-(--breakpoit-2xl)">
                <div className="min-h-[calc(100vh-122px)] p-20.5 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
                    <h2 className="text-gray-800 dark:text-white font-semibold ">Кошик</h2>
                    <div className="mt-10">
                        <div className="sm:col-span-3 mb-2">
                            {list
                                ? <CartItemsTable cartItems={list} />
                                : <div>
                                    <div className="text-center flex items-center justify-center p-5">
                                        <div>
                                            <div className="text-gray-500 mb-3 flex items-center justify-center">
                                                <ShoppingBasket size="40" />
                                            </div>

                                            <h1 className="text-2xl font-bold dark:text-white text-gray-800">
                                                Кошик порожній
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;