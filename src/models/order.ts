import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/sequelize";

const Order = sequelize.define("order", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});

export default Order;
