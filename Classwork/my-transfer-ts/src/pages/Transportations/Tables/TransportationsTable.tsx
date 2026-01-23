import React from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../../admin/components/ui/table";
import Badge from "../../../admin/components/ui/badge/Badge.tsx";
import type {ITransportationsItem} from "../../../Interfaces/ITransportations/ITransportationsItem.ts";

interface IUserSearchTableProps {
    transportations: ITransportationsItem[] | null;
}

const TransportationsTable: React.FC<IUserSearchTableProps> = (props) => {
    return (
        <>
            {props.transportations && (
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
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {props.transportations.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <p>{item.code}</p>
                                            </TableCell>
                                            <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <p className="p-1 text-nowrap">Країна: <span className="dark:text-blue-300 text-blue-500 font-semibold">{item.fromCountryName}</span></p>
                                                <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{item.fromCityName}</span></p>
                                            </TableCell>
                                            <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <p className="p-1 text-nowrap" >Країна: <span className="dark:text-blue-300 text-blue-500 font-semibold">{item.toCountryName}</span></p>
                                                <p className="p-1 text-nowrap">Місто: <span className="dark:text-green-400 text-green-700 font-semibold">{item.toCityName}</span></p>
                                            </TableCell>
                                            <TableCell className="space-y-1 px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <p className="p-1">Час відправлення: <span className="dark:text-blue-300 text-blue-500 font-semibold text-nowrap">{item.departureTime}</span></p>
                                                <p className="p-1">Час прибуття: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{item.arrivalTime}</span></p>
                                            </TableCell>
                                            <TableCell className="px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <p className="p-1 text-nowrap">Загальна кількість мість: <span className="dark:text-blue-300 text-blue-500 font-semibold text-nowrap">{item.seatsTotal}</span></p>
                                                <p className="p-1 text-nowrap">Вільних мість залишилось: <span className="dark:text-green-400 text-green-700 font-semibold text-nowrap">{item.seatsAvailable}</span></p>
                                            </TableCell>
                                            <TableCell className="px-2 py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <Badge
                                                    key={item.id}
                                                    size="sm"
                                                    color={item.statusName === "запланований"
                                                            ? "primary"
                                                            : item.statusName === "затримується"
                                                                ? "warning"
                                                                : item.statusName === "скасований"
                                                                    ? "error"
                                                                    : item.statusName === "виконаний"
                                                                        ? "success"
                                                                        : item.statusName === "виконується"
                                                                            ? "info"
                                                                            : item.statusName === "немає мість"
                                                                                ? "light" : "dark"
                                                    }
                                                >
                                                    {item.statusName}
                                                </Badge>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TransportationsTable;