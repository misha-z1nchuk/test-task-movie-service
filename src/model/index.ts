import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'

export interface UsersAttributes{
    id: number | undefined,
    name: string,
    email: string
    password: string;
}

export class Users extends Model<UsersAttributes>{


}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: false
    }
)
