import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useState} from "react";
import type {ICytiModal} from "../Interfaces/IModal/ICytiModal.ts";
import APP_ENV from "../env";

const CityModal: React.FC<ICytiModal> = ({onOpen, city}) => {
    const [open, setOpen] = useState(onOpen);

    return (
        <div className="rounded-xl transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:text-gray-700 dark:text-white text-gray-700">
            <button
                onClick={() => setOpen(true)}
                className="cursor-pointer w-full rounded-b-xl rounded-t-md bg-white/15 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20"
            >
                Деталі
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-110">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-gray-200 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-64 sm:w-full mt-3 text-left sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="flex justify-between text-base font-semibold dark:text-white text-gray-800">
                                            <div>
                                                {city.name}
                                            </div>
                                            <div>
                                                <h6 className="m-0 bg-blue-500 border-2 border-blue-700 rounded-lg px-1 block font-sans font-semibold text-base leading-snug tracking-normal text-gray-100 antialiased">
                                                    {city.country}
                                                </h6>
                                            </div>
                                        </DialogTitle>
                                        <div>
                                            <p className="mb-2 text-sm dark:text-blue-200 text-blue-500">
                                                {city.slug}
                                            </p>
                                            <div className="flex justify-center items-center relative my-2 overflow-hidden rounded-xl text-white shadow-lg myBGImage">
                                                <img draggable={false} className="w-full" src={`${APP_ENV.API_BASE_URL}/images/${city.image}`} alt={city.image}/>
                                            </div>
                                            <p className="text-sm dark:text-gray-400 text-gray-700">
                                                {city.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md dark:bg-white/10 bg-gray-400 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
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

export default CityModal;