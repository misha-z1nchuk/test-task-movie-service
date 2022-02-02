import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'


export class Actors extends Model{}


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
        movieId:{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    },
    {
        sequelize: db,
        tableName: 'actors',
    }
)
