import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'

export interface UserAttr{}

export class Users extends Model<UserAttr>{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
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
            unique: true
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
