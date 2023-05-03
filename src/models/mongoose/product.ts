import { Schema, model, Types } from "mongoose";

type IProduct = {
	title: string;
	price: number;
	imageUrl: string;
	description: string;
	userId: String;
};

const schema = new Schema<IProduct>({
	title: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	imageUrl: String,
	description: String,
	userId: {
		type: Types.ObjectId,
		ref: "User",
	},
});

const Product = model<IProduct>("Product", schema);

export default Product;
