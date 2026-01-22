import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import type {IAccountRegister} from "../../../Interfaces/IAccount/IAccountRegister.ts";
import {Image} from "lucide-react";
import {AccountRegisterAsync} from "../../../services/Account/AccountRegisterService.ts";
import {useAuth} from "../../../hooks/useAuth.ts";
import type {IAccountRegisterError} from "../../../Interfaces/IAccount/IAccountRegisterError.ts";
import type {IErrors} from "../../../Interfaces/IErrors/IError.ts";



const RegisterPage = () => {
    const {login} = useAuth();
    const MAX_SIZE= 5 * 1024 * 1024; //5MB
    const [sizeError, setSizeError] = useState<boolean>(false)

    const [formData, setFormData] = useState<IAccountRegister>({firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    image: null});

    const [formDataError, setFormDataError] = useState<IAccountRegisterError>({
        firstNameError: undefined,
        lastNameError: undefined,
        emailError: undefined,
        passwordError: undefined,
        passwordConfirmError: undefined,
        imageError: undefined,
    })

    const [preview, setPreview] = useState<string | undefined>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleFiles = (files: FileList | null) => {
        if (!files || !files[0]) return;

        const f = files[0];
        if (!f.type.startsWith("image/")) return;

        if (f.size > MAX_SIZE) {
            setFormData(prev => ({...prev, image: null}));
            setPreview(undefined);
            setSizeError(true);
            return;
        }

        setSizeError(false);
        setFormData(prev => ({...prev, image: f}));
        setPreview(URL.createObjectURL(f));
    };

    const getErrors = (errors: IErrors) => {
        setFormDataError(prev => ({...prev, imageError: undefined}));
        setFormDataError(prev => ({...prev, firstNameError: undefined}));
        setFormDataError(prev => ({...prev, lastNameError: undefined}));
        setFormDataError(prev => ({...prev, emailError: undefined}));
        setFormDataError(prev => ({...prev, passwordError: undefined}));
        setFormDataError(prev => ({...prev, passwordConfirmError: undefined}));
        if(errors !== undefined && errors !== null) {
            Object.entries(errors).forEach(([field, messages]) => {
                messages.forEach((msg: string) => {
                    switch (field) {
                        case "FirstName":
                            setFormDataError(prev => ({...prev, firstNameError: msg}));
                            break;
                        case "LastName":
                            setFormDataError(prev => ({...prev, lastNameError: msg}))
                            break;
                        case "Email":
                            setFormDataError(prev => ({...prev, emailError: msg}));
                            break;
                        case "Password":
                            setFormDataError(prev => ({...prev, passwordError: msg}));
                            break;
                        case "PasswordConfirm":
                            setFormDataError(prev => ({...prev, passwordConfirmError: msg}));
                            break;
                        case "Image":
                            setFormDataError(prev => ({...prev, imageError: msg}));
                            break;
                    }
                });
            });
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = await AccountRegisterAsync(formData);
        if (!data.token) {
            // console.log("error", data);
            getErrors(data.errors);
            throw new Error("Register failed");
        }
        // console.log("Register successfully => login", data.token);
        await login(data.token);
        navigate("/");
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <form onSubmit={onSubmit}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 mb-2">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Ім'я
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.firstName}
                                    onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                                    type="text"
                                    className="block w-full rounded-md dark:bg-white/5 bg-blue-200 px-3 py-1.5 dark:text-white text-gray-900 outline-1 -outline-offset-1 dark:outline-white/10 outline-blue-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {formDataError.firstNameError && (<div className="text-red-400 max-w-72">{formDataError.firstNameError}</div>)}
                        </div>

                        <div className="sm:col-span-3 mb-2">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Прізвище
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.lastName}
                                    onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                                    type="text"
                                    className="block w-full rounded-md dark:bg-white/5 bg-blue-200 px-3 py-1.5 dark:text-white text-gray-900 outline-1 -outline-offset-1 dark:outline-white/10 outline-blue-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {formDataError.lastNameError && (<div className="text-red-400 max-w-72">{formDataError.lastNameError}</div>)}
                        </div>

                        <div className="sm:col-span-full mb-2">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Електронна адреса
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                    type="text"
                                    className="block w-full rounded-md dark:bg-white/5 bg-blue-200 px-3 py-1.5 dark:text-white text-gray-900 outline-1 -outline-offset-1 dark:outline-white/10 outline-blue-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {formDataError.emailError && (<div className="text-red-400 max-w-72">{formDataError.emailError}</div>)}
                        </div>

                        <div className="sm:col-span-3 mb-2">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Пароль
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                                    type="password"
                                    className="block w-full rounded-md dark:bg-white/5 bg-blue-200 px-3 py-1.5 dark:text-white text-gray-900 outline-1 -outline-offset-1 dark:outline-white/10 outline-blue-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {formDataError.passwordError && (<div className="text-red-400 max-w-72">{formDataError.passwordError}</div>)}
                        </div>

                        <div className="sm:col-span-3 mb-2">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Підтвердження пароля
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formData.passwordConfirm}
                                    onChange={(e) => setFormData(prev => ({...prev, passwordConfirm: e.target.value}))}
                                    type="password"
                                    className="block w-full rounded-md dark:bg-white/5 bg-blue-200 px-3 py-1.5 dark:text-white text-gray-900 outline-1 -outline-offset-1 dark:outline-white/10 outline-blue-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                            {formDataError.passwordConfirmError && (<div className="text-red-400 max-w-72">{formDataError.passwordConfirmError}</div>)}
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm/6 font-medium dark:text-white text-gray-800">
                                Зображення міста
                            </label>
                            <div onDragOver={e => {
                                e.preventDefault();
                            }}
                                 onDrop={e => {
                                     e.preventDefault();
                                     handleFiles(e.dataTransfer.files);
                                 }}
                                 className={`mt-2 flex justify-center rounded-lg border border-dashed dark:border-white/25 border-gray-700 px-6 ${ formData.image ? "py-4" : "py-10"}`}>
                                <div className="text-center">
                                    { formData.image ? <div className="rounded p-1 border-dashed border-white/25 border">
                                        <img
                                            className="w-96 mx-auto rounded object-cover"
                                            src={preview} alt={preview}/>
                                    </div>  : <Image aria-hidden="true" className="mx-auto size-12 text-gray-600" /> }

                                    <div className="flex justify-center mt-4 text-sm/6 text-gray-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                                        >
                                            { !formData.image ? <span>Завантажте файл</span> : <span>{formData.image.name}</span> }
                                            <input
                                                ref={inputRef}
                                                id="file-upload"
                                                accept="image/*"
                                                onChange={e => handleFiles(e.target.files)}
                                                type="file"
                                                className="sr-only" />
                                        </label>
                                        {!formData.image && <p className="pl-1">або перетягніть</p> }
                                    </div>
                                    {!formData.image && <p className={`text-xs/5 text-gray-400`}>PNG, JPG, GIF <span className={ sizeError ? "text-red-400 underline" : ""}>розміром до 5MB</span></p> }
                                </div>
                            </div>
                            {formDataError.imageError && (<div className="text-red-400 max-w-md">{formDataError.imageError}</div>)}
                        </div>

                    </div>

                    <div className="pb-3 mt-6 flex items-center justify-center gap-x-6">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Увійти
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;