import { SrvRecord } from "dns";
import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo";

const COLLECTION = "products";

export interface IProduct {
	id: ObjectId;
	title: string;
	price: number;
	imageUrl: string;
	description: string;
	userId?: ObjectId;
}

class Product {
	private _id?: string;
	private title: string;
	private price: number;
	private imageUrl: string;
	private description: string;
	constructor(
		title: string,
		price: number,
		image: string,
		description: string,
		id?: string
	) {
		this.title = title;
		this.price = price;
		this.imageUrl = image;
		this.description = description;
		this._id = id;
	}

	public async save() {
		const db = getDb();
		try {
			const result = await db.collection(COLLECTION).insertOne({
				title: this.title,
				price: this.price,
				imageUrl: this.imageUrl,
				description: this.description,
			});
			console.log(result);
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
	public async update(id: string) {
		const db = getDb();
		try {
			const item = await db.collection(COLLECTION).updateOne(
				{
					_id: new ObjectId(id),
				},
				// {
				// 	$set: {
				// 		title: this.title,
				// 		price: this.price,
				// 		imageUrl: this.imageUrl,
				// 		description: this.description,
				// 	},
				// }
				{
					$set: this,
				}
			);
			return item;
		} catch (err) {
			console.log(err);
			throw new Error("Update Error");
		}
	}

	static async getAllProudcts() {
		const db = getDb();
		try {
			const items = await db.collection(COLLECTION).find().toArray();
			const result = items.map(p => {
				return { ...p, id: p._id.toString() };
			});
			return result;
		} catch (err: any) {
			console.log(err);
			throw new Error(err);
		}
	}
	static async getProduct<IProduct>(id: string) {
		const db = getDb();
		try {
			const product = await db
				.collection(COLLECTION)
				.findOne({ _id: new ObjectId(id) });
			const result = { ...product, id: product?._id.toString() };
			return result;
		} catch (err) {
			console.log(err);
		}
	}
	static async deleteOne(id: string) {
		const db = getDb();
		try {
			const result = await db.collection(COLLECTION).deleteOne({
				_id: new ObjectId(id),
			});
			return result;
		} catch (err: any) {
			console.log(err);
			throw new Error("deleteOne(): " + err.message);
		}
	}
}
export default Product;
