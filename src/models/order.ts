import { ObjectId } from "bson";
import { model, Schema, Types } from "mongoose";
import { DataTypes, Sequelize } from "sequelize";
import { getDb } from "../db/mongo";
import sequelize from "../db/sequelize";

const COLLECTION = "orders";

const Order = sequelize.define("order", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});

export default Order;

export const getOrder = async () => {
	const db = getDb();

	return await db.collection(COLLECTION).find().toArray();
};
