import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/sequelize";

const OrderItem = sequelize.define("orderItem", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quentity: {
		type: DataTypes.INTEGER,
	},
});

export default OrderItem;
