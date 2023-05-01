import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";

const Cart = sequelize.define("cart", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});
export default Cart;
