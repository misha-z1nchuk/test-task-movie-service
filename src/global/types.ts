import {Users} from "../model/users-model";

export interface UserI extends Users{
    name: string,
    email: string,
    password: string,
}
