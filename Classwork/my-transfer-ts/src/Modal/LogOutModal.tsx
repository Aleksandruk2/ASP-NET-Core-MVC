import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {useState} from "react";
import {useAuth} from "../hooks/useAuth.ts";

const LogOutModal: React.FC<{onOpen: boolean}> = ({onOpen}) => {
    const [open, setOpen] = useState<boolean>(onOpen);
    const { user } = useAuth();
    const { logout } = useAuth();

    return (
        <div>
            <button className="font-medium ml-3 p-1 rounded hover:bg-gray-700 cursor-pointer"
                    onClick={() => setOpen(true)}>
                <div>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                             fill="currentColor" className="block text-white rounded bg-primary-700 bg-transparent text-primary-700 p-0 dark:text-white bi bi-box-arrow-left"
                             viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fillRule="evenodd"
                                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                    </div>
                    <div className="block text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 p-0 dark:text-white">
                        Вийти
                    </div>
                </div>
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-64 sm:w-full mt-3 text-left sm:mt-0 sm:ml-4">
                                        <DialogTitle as="h3" className="flex justify-between text-base font-semibold text-white">
                                            Вийти
                                        </DialogTitle>
                                        <div className="text-sm text-gray-300">
                                            Ви дійсно хочите вийти?
                                            <div className="border border-dashed border-gray-300 rounded px-3 py-1.5 mt-1">
                                                <div className="flex justify-between items-center w-full">
                                                    <div>
                                                        <div className="text-gray-400 rounded">
                                                            { user?.firstName } {user?.lastName }
                                                        </div>
                                                        <div className="text-gray-400 rounded">
                                                            { user?.email }
                                                        </div>
                                                    </div>
                                                    <div className="h-12 w-12 rounded-full overflow-hidden">
                                                        <img src={user?.image} width={100} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => {
                                        setOpen(false);
                                        logout();
                                    }}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-red-400 sm:mt-0 sm:w-auto"
                                >
                                    Вийти
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mx-3 mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
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

export default LogOutModal;