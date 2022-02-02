import {Sequelize} from "sequelize";
require('dotenv').config()

const db_user : string = process.env.DB_USERNAME || "username";
const db_password : string = process.env.DB_PASSWORD || "username";

const db = new Sequelize('movies-lib', db_user, db_password, {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false,
})


export default db;