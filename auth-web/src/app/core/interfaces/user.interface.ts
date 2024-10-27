import { Message } from "./message.interface";

export interface User extends Message {
    id?: string,
    name?: string,
    email?: string;
    role?: string; 
    password?: string;
    registerDate?: Date;
    token?: string;
    
}