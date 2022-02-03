import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'


export class Users extends Model{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

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
