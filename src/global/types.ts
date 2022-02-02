import {Users} from "../model";

export interface UserI extends Users{
    id?: number | undefined,
    name: string,
    email: string,
    password: string,
}
