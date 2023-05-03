import { Schema, model, Model, Types, ObjectId } from "mongoose";
import { IProduct } from "../products_mysql";

type TCart = {
	productId: {
		type: Types.ObjectId;
		required: true;
		ref: "Prodcut";
	};
	quentity: {
		type: Number;
		required: true;
	};
};
type TUser = {
	id: Types.ObjectId;
	name: string;
	email: string;
	cart: {
		items: TCart[];
	};
};

interface IUserMethods {
	addToCart(product: IProduct): void;
	getCart(): IProduct[];
	removeFromCart(prodcutId: Types.ObjectId): void;
	addOrder(): void;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<TUser, {}, IUserMethods>;

const schema = new Schema<TUser>({
	id: Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	cart: {
		items: [
			{
				prodcutId: {
					type: Types.ObjectId,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
});

schema.methods.addToCart = function (product: IProduct) {
	const idx = this.cart.items.findIndex((cart: TCart) => {
		return cart.productId.toString() === product.id.toString();
	});

	let newQty = 1;
	const updateCartItems = [...this.cart.items];
	if (idx >= 0) {
		newQty = this.cart.items[idx].quantity + 1;
		updateCartItems[idx].quantity = newQty;
	} else {
		updateCartItems.push({
			productId: product.id,
			quentity: newQty,
		});
	}
	const updateCart = {
		items: updateCartItems,
	};
	this.cart = updateCart;
	return this.save();
};

schema.methods.getCart = function () {
	return [];
};

schema.methods.removeFromCart = function (productId: ObjectId) {
	const updateCartItems = this.cart.items.filter((item: TCart) => {
		return item.productId.toString() !== productId.toString();
	});
	this.cart = updateCartItems;
	this.save();
};

schema.methods.addOrder = async function () {
	const order = {
		items: this.cart.items,
		user: {
			_id: this.id,
			name: this.name,
		},
	};
};

const User = model<TUser>("User", schema);

export default User;
