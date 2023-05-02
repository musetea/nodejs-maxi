import { ObjectId } from "bson";
import { getDb } from "../db/mongo";
import { clsCart } from "./cart";
import { IProduct } from "./product";

const COLLECTION = "users";
class User {
	private name: string;
	private email: string;
	private id: string;
	private cart: clsCart;

	constructor(name: string, email: string, id: string, cart: clsCart) {
		this.name = name;
		this.email = email;
		this.id = id;
		this.cart = cart;
	}
	public async save() {
		const db = getDb();
		try {
			const result = await db.collection(COLLECTION).insertOne(this);
			return result;
		} catch (err: any) {
			console.log(err);
			throw new Error("save() " + err.message);
		}
	}
	public async update(id: string) {
		const db = getDb();
		try {
			const result = await db.collection(COLLECTION).updateOne(
				{
					_id: new ObjectId(id),
				},
				{
					$set: this,
				}
			);
			return result;
		} catch (err: any) {
			console.log(err);
			throw new Error("update() " + err.message);
		}
	}

	public static async getAllUsers() {
		const db = getDb();
		const items = await db.collection(COLLECTION).find().toArray();
		const result = items.map(p => {
			return { ...p, id: p._id.toString() };
		});
		return result;
	}

	public static async getById(id: string) {
		const db = getDb();
		const result = await db
			.collection(COLLECTION)
			.findOne<{ name: string; email: string; cart: clsCart; _id: ObjectId }>({
				_id: new ObjectId(id),
			});
		return {
			id: result?._id,
			name: result?.name,
			email: result?.email,
			cart: result?.cart || new clsCart(),
		};
	}

	public static async deleteById(id: string) {
		const db = getDb();
		const result = await db.collection(COLLECTION).deleteOne({
			_id: new ObjectId(id),
		});
		return result;
	}

	public async addToCart(productId: string, qty: number) {
		this.cart.add(productId, qty);

		await this.updateCart();
	}
	public async getCart() {
		const cart: clsCart = this.cart;
		const ids = cart.items.map(p => p.id);
		console.log("ids:", ids);
		const products = await getDb()
			.collection("products")
			.find({
				_id: {
					$in: ids,
				},
			})
			.toArray();
		const items = products.map(p => {
			const qty = cart.items.find(
				i => i.id.toString() === p._id.toString()
			)?.quentity;
			return { ...p, quentity: qty };
		});
		return items;
	}

	async updateCart() {
		const db = getDb();
		const result = await db.collection(COLLECTION).updateOne(
			{
				_id: new ObjectId(this.id),
			},
			{
				$set: {
					cart: this.cart,
				},
			}
		);
		return result;
	}

	public async addOrder() {
		const products = await this.getCart();
		const order = {
			items: products,
			user: {
				_id: this.id,
				name: this.name,
			},
		};
		const db = getDb();
		const result = await db.collection("orders").insertOne(order);
		this.cart.clear();
		await this.updateCart();
	}
	public async getOrder() {
		const db = getDb();
		const fillter = {
			_id: new ObjectId(this.id),
		};
		const order = await db.collection("orders").find(fillter).toArray();
	}
}
export default User;
