export interface IAccountRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    image: File | null;
}