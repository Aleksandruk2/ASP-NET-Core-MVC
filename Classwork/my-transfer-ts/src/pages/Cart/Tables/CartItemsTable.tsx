import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../../admin/components/ui/table";
import Badge from "../../../admin/components/ui/badge/Badge.tsx";
import type {ITransportationsItem} from "../../../Interfaces/ITransportations/ITransportationsItem.ts";
import type {ICartItemResult} from "../../../Interfaces/ICartItem/ICartItemResult.ts";
import CartItemModal from "../../../Modal/CartItemModal.tsx";

interface ICartItemsTableProps {
    cartItems: ICartItemResult[] | null;
}

const CartItemsTable: React.FC<ICartItemsTableProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ITransportationsItem | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0);

    const handleRowClick = (item: ITransportationsItem, quantity: number) => {
        setSelectedItem(item);
        setSelectedQuantity(quantity);
        setOpen(true);
    };

    return (
        <>
            {props.cartItems && (
                <>
                    <div>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <Table>
                                    {/* Table Header */}
                                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                        <TableRow>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Код
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Звідки
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Куди
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Час відправки/прибуття
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Кількість сидінь
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Статус поїздки
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Кількість квитків
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    {/* Table Body */}
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {props.cartItems.map((cartItem) => (
                                            <TableRow key={cartItem.id}
                                                      className="hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer"
                                                      onClick={() => {
                                                          handleRowClick(cartItem, cartItem.quantity);
                                                      }}
                                            >
                                                <TableCell className="px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    <p className="transform rotate-270">{cartItem.code}</p>
                                                </TableCell>
                                                <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{cartItem.fromCityName}</span></p>
                                                    <p className="p-1 text-nowrap">Країна: <span className="dark:text-gray-300 text-gray-500">{cartItem.fromCountryName}</span></p>
                                                </TableCell>
                                                <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                    <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{cartItem.toCityName}</span></p>
                                                    <p className="p-1 text-nowrap">Країна: <span className="dark:text-gray-300 text-gray-500">{cartItem.toCountryName}</span></p>
                                                </TableCell>
                                                <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <p className="p-1">Час відправлення: <span className="dark:text-blue-300 text-blue-500 font-semibold text-nowrap">{cartItem.departureTime}</span></p>
                                                    <p className="p-1">Час прибуття: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{cartItem.arrivalTime}</span></p>
                                                </TableCell>
                                                <TableCell className="px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <p className="p-1 text-nowrap">Загальна кількість мість: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{cartItem.seatsTotal}</span></p>
                                                    <p className="p-1 text-nowrap">Вільних мість залишилось: <span className="dark:text-orange-300 text-orange-400 font-semibold text-nowrap">{cartItem.seatsAvailable}</span></p>
                                                </TableCell>
                                                <TableCell className="px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <Badge
                                                        key={cartItem.id}
                                                        size="sm"
                                                        color={cartItem.statusName === "запланований"
                                                            ? "primary"
                                                            : cartItem.statusName === "затримується"
                                                                ? "warning"
                                                                : cartItem.statusName === "скасований"
                                                                    ? "error"
                                                                    : cartItem.statusName === "виконаний"
                                                                        ? "success"
                                                                        : cartItem.statusName === "виконується"
                                                                            ? "info"
                                                                            : cartItem.statusName === "немає мість"
                                                                                ? "light" : "dark"
                                                        }
                                                    >
                                                        {cartItem.statusName}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="px-2 py-1 text-gray-100 text-start text-theme-sm dark:text-gray-300 font-semibold text-nowrap">
                                                    <p className="transform rotate-90 dark:bg-gray-600 bg-gray-400/90 rounded p-2 dark:border-yellow-300/70 border-yellow-300/70 border-2 border-dashed">Квитків <span className="dark:text-purple-400 text-purple-500">{cartItem.quantity}</span></p>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <CartItemModal
                                    item={selectedItem}
                                    onClose={() => setOpen(false)}
                                    open={open}
                                    quantity={selectedQuantity}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default CartItemsTable;