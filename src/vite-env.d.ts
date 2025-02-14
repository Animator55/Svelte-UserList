/// <reference types="svelte" />
/// <reference types="vite/client" />
export type userType = {
    _id: string;
    guid: string;
    balance: string;
    name: string;
    gender: string;
    email: string;
    phone: string;
    [key: string]: string
}

export type userDataType = {
    name: string
    gender: string
    email: string
    phone: string
}