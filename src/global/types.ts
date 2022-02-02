import { Model } from "sequelize";

export interface UserI extends Model{
    id?: number | undefined,
    name: string,
    email: string,
    password: string,
}
