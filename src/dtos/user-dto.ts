import {UserI} from "../global/types";



module.exports = class UserDto{
    id: number | undefined;
    name: string;
    email: string;
    constructor(model: UserI) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
    }
}