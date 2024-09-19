import { Message } from "./message.interface";

export interface User extends Message {
    id?: string,
    name?: string,
    email?: string;
    password?: string;
    token?: string;
    role?: string;
}