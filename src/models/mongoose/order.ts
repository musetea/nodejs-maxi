import { Types, model, Schema } from "mongoose";

type TOrder = {
	user: {
		userId: Types.ObjectId;
		name: string;
	};
	products: [
		{
			item: {
				type: Object;
				required: true;
			};
			quantity: {
				type: Number;
				required: true;
			};
		}
	];
};

const schema = new Schema<TOrder>({
	user: {
		name: {
			type: String,
		},
		userId: {
			type: Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	products: [
		{
			item: Object,
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
});

const Order = model("order", schema);
export default Order;
