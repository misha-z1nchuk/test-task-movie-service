import {Users} from "../model/users-model";

module.exports = class UserDto{
    id: number | undefined;
    name: string;
    email: string;
    constructor(model: Users) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
    }
}