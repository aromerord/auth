import { Message } from "./message.interface";

export interface User {
    uid?: string,
    name?: string,
    email?: string;
    password?: string;
    role?: string;
}

export interface Auth extends Message {
    uid?: string,
    name?: string,
    email?: string;
    token?: string;
    role?: string;
}