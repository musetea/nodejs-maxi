import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
import { CreationOptional } from "sequelize";

import sequelize from "../db/sequelize";

interface UserModel
	extends Model<
		InferAttributes<UserModel>,
		InferCreationAttributes<UserModel>
	> {
	// Some fields are optional when calling UserModel.create() or UserModel.build()
	id: CreationOptional<number>;
	name: string;
	email: string;
	password?: string;
}

const User = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});
export default User;
