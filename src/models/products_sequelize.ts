import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
} from "sequelize";
import { CreationOptional } from "sequelize";

import sequelize from "../db/sequelize";

interface ProductModel
	extends Model<
		InferAttributes<ProductModel>,
		InferCreationAttributes<ProductModel>
	> {
	// Some fields are optional when calling UserModel.create() or UserModel.build()
	id: CreationOptional<number>;
	title: string;
	price: number;
	description: string;
	imageUrl: string;
	userId?: number;
}

const Product = sequelize.define<ProductModel>("product", {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	imageUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Product;
