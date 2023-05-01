import { off } from "process";
import { Sequelize } from "sequelize";

const HOST = process.env.MYSQL_HOST!;
const DB_DATABASE = process.env.MYSQL_DB!;
const DB_USER = process.env.MYSQL_USER!;
const DB_PASSWORD = process.env.MYSQL_PASSWORD!;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	dialect: "mysql",
	host: HOST,
	logging: false,
});

export default sequelize;
