import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'

interface UsersAttributes{
    id: string,
    name: string,
    email: string
    password: string;
}

export class Users extends Model<UsersAttributes>{


}

Users.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'users'
    }
)
