import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../db/sequelize";

const CartItem = sequelize.define("cartItem", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
});

export default CartItem;
