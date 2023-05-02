import { ObjectId } from "bson";
import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize";
import { getDb } from "../db/mongo";

const Cart = sequelize.define("cart", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
});
export default Cart;

interface ICart {
	id: ObjectId;
	quentity: number;
}
export class clsCart {
	private _items: ICart[] = [];

	constructor() {}

	public get items() {
		return this._items;
	}

	public add(id: string, qty: number = 1) {
		const _id = new ObjectId(id);
		const idx = this.items.findIndex(p => p.id === _id);

		const updateItems = [...this._items];
		if (idx < 0) {
			updateItems.push({
				id: _id,
				quentity: qty,
			});
		} else {
			const newQty = updateItems[idx].quentity + qty;
			updateItems[idx].quentity = newQty;
		}
		this._items = [...updateItems];
	}
	public clear() {
		this._items = [];
	}
}
