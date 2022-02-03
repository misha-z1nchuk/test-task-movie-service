import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config'
import {Actors} from "./actors-model";


export class Movies extends Model{}


Movies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        actors: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    },
    {
        sequelize: db,
        tableName: 'movies',
    }
)
Movies.hasMany(Actors, {foreignKey: 'movieId'})
Actors.belongsTo(Movies, {foreignKey: 'movieId'})


