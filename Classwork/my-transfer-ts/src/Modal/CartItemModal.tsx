import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import type {ITransportationsItem} from "../Interfaces/ITransportations/ITransportationsItem.ts";
import Badge from "../admin/components/ui/badge/Badge.tsx";
import {ArrowBigDown, Bus} from "lucide-react";

interface IProps {
    open: boolean;
    onClose: () => void;
    item: ITransportationsItem | null;
    quantity: number;
}

const CartItemModal: React.FC<IProps> = ({open, onClose, item, quantity}) => {

    return (
        <div className="rounded-xl transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300 text-gray-700">
            <Dialog open={open} onClose={onClose} className="relative z-100">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-64 sm:w-full mt-3 text-left sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="flex justify-between text-base font-semibold text-gray-800 dark:text-white">
                                            Код: {item?.code}
                                        </DialogTitle>
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            <div className="pb-1">
                                                Статус: <Badge
                                                    key={item?.id}
                                                    size="sm"
                                                    color={item?.statusName === "запланований"
                                                        ? "primary"
                                                        : item?.statusName === "затримується"
                                                            ? "warning"
                                                            : item?.statusName === "скасований"
                                                                ? "error"
                                                                : item?.statusName === "виконаний"
                                                                    ? "success"
                                                                    : item?.statusName === "виконується"
                                                                        ? "info"
                                                                        : item?.statusName === "немає мість"
                                                                            ? "light" : "dark"
                                                    }
                                                >
                                                    {item?.statusName}
                                                </Badge>
                                            </div>

                                            <div className="bg-gray-100 dark:bg-gray-800 border border-dashed dark:border-gray-300 border-gray-500 rounded px-3 py-1.5 mt-1">
                                                <div className="w-full">
                                                    <div className="flex justify-between border-b dark:border-gray-300 border-gray-500 mb-2 mx-2 pb-1">
                                                        <p className="p-1 text-nowrap">Вільних мість залишилось: <span className="dark:text-orange-300 text-orange-400 font-semibold text-nowrap">{item?.seatsAvailable}</span></p>
                                                        <p className="p-1 text-nowrap">Загальна кількість мість: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{item?.seatsTotal}</span></p>
                                                    </div>

                                                    <div>
                                                        <div className="dark:bg-indigo-500/10 bg-indigo-500/20 text-center border dark:border-gray-300 border-gray-500 rounded-t-md p-2">
                                                            Відправлення
                                                        </div>
                                                        <div className="flex text-gray-600 dark:text-gray-400 dark:border-gray-300 border-gray-500 rounded-b-md border border-t-0">
                                                            <div
                                                                className="border-e dark:border-gray-300 border-gray-500 overflow-hidden w-35">
                                                                <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{item?.fromCityName}</span></p>
                                                                <p className="p-1 text-nowrap">Країна: <span className="dark:text-gray-300 text-gray-500">{item?.fromCountryName}</span></p>
                                                            </div>
                                                            <div>
                                                                <p className="p-1 px-3 text-nowrap">Час відправлення: <span className="dark:text-blue-300 text-blue-500 font-semibold text-nowrap">{item?.departureTime}</span></p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-flow-col auto-cols-fr gap-4">
                                                            <div className="p-2"><ArrowBigDown size="30"/></div>
                                                            <div className="p-2"><Bus size="30"/></div>
                                                            <div className="p-2"><ArrowBigDown size="30"/></div>
                                                            <div className="p-2"><Bus size="30"/></div>
                                                            <div className="p-2"><ArrowBigDown size="30"/></div>
                                                            <div className="p-2"><Bus size="30"/></div>
                                                            <div className="p-2"><ArrowBigDown size="30"/></div>
                                                        </div>

                                                        <div className="dark:bg-green-400/10 bg-green-500/20 text-center border dark:border-gray-300 border-gray-500 rounded-t-md p-2">
                                                            Прибуття
                                                        </div>
                                                        <div className="flex text-gray-600 dark:text-gray-400 dark:border-gray-300 border-gray-500 rounded-b-md border border-t-0">
                                                            <div
                                                                className="border-e dark:border-gray-300 border-gray-500 overflow-hidden w-35">
                                                                <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{item?.toCityName}</span></p>
                                                                <p className="p-1 text-nowrap">Країна: <span className="dark:text-gray-300 text-gray-500">{item?.toCountryName}</span></p>
                                                            </div>
                                                            <div>
                                                                <p className="p-1 px-3 text-nowrap">Час прибуття: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{item?.arrivalTime}</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-2">
                                                    <h2 className="border-t border-gray-300 py-1 text-gray-800 dark:text-gray-200 font-semibold ">Кількість ваших квитків.</h2>
                                                    <div className="bg-blue-100/40 dark:bg-gray-700 shadow-md rounded-lg p-3 my-2">
                                                        <div className="grid grid-cols-1">
                                                            <div>
                                                                <div className="px-2 py-1 text-gray-100 text-start text-theme-sm dark:text-gray-300 font-semibold text-nowrap">
                                                                    <p className="text-center p-3 text-lg dark:bg-gray-600 bg-gray-400 rounded p-1 dark:border-yellow-400/50 border-yellow-400/80 border-3 border-dashed">Квитків <span className="dark:text-purple-400 text-purple-500">{quantity}</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    data-autofocus*/}
                                {/*    onClick={() => {*/}
                                {/*        const result = CartAddUpdate({quantity, transportations: item});*/}
                                {/*        console.log("result", result);*/}
                                {/*        onClose();*/}
                                {/*    }}*/}
                                {/*    className="mt-3 inline-flex w-full justify-center rounded-md bg-green-700 hover:bg-green-600 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 sm:mt-0 sm:w-auto"*/}
                                {/*>*/}
                                {/*    Додати поїздку до кошика*/}
                                {/*</button>*/}
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={onClose}
                                    className="sm:mx-3 mt-3 inline-flex w-full justify-center rounded-md dark:bg-white/10 bg-gray-500/80 text-white px-3 py-2 text-sm font-semibold inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                >
                                    Закрити
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default CartItemModal;