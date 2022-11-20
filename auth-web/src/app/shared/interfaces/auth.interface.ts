import { Message } from "./message.interface";

export interface User {
    uid?: string,
    name?: string,
    email?: string;
    password?: string;
}

export interface Auth extends Message {
    uid?: string,
    name?: string,
    email?: string;
    token?: string
}