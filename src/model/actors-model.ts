import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'


export class Actors extends Model{
    public id!: number;
    public name!: string;
    public movieId!: number;
}


Actors.init(
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
    },
    {
        sequelize: db,
        tableName: 'actors',
    }
)
