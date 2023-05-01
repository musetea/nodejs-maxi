import fs from "fs";
import { RowDataPacket } from "mysql2";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import db, { query, excute } from "../db/mysql";

export interface IProduct {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	description: string;
}

const productPath = path.join(
	// path.dirname(__filename),
	__dirname,
	"..",
	"data",
	"products.json"
);

export const getProducts = (dir: string = productPath) => {
	return new Promise<IProduct[]>((reslove, reject) => {
		try {
			const json = fs.readFileSync(dir, "utf-8").trim();
			// console.log("JSON", json);
			if (json === "") {
				reslove([]);
			} else {
				reslove(JSON.parse(json));
			}
		} catch (err) {
			console.log(err, "getProducts");
			reject(err);
		}
	});
};

const writeProducts = (items: IProduct[]) => {
	fs.writeFile(productPath, JSON.stringify(items), err => {
		if (err) console.log(err);
		console.log("done");
	});
};

class Product {
	private id: string = "";
	constructor(
		private name: string,
		private price: number,
		private image: string,
		private description: string
	) {}

	public static getAllProducts = async () => {
		const sql = "SELECT * FROM products;";
		const rows = await query(sql);
		console.log(rows);
		return rows;
	};
	public static getProduct = async (id: string) => {
		const sql = `SELECT * FROM products where id='${id}';`;
		const rows = (await query(sql)) as RowDataPacket;
		console.log(rows[0]);
		return rows[0];
	};

	static async remove(id: string) {
		if (!id) return;
		const products = (await getProducts()) || [];
		const newProducts = products.filter(p => p.id !== id);
		writeProducts(newProducts);
	}

	public async save() {
		// console.log(productPath);
		// const products = (await getProducts()) || [];
		// products.push({
		// 	id: uuidV4(),
		// 	name: this.name,
		// 	price: this.price,
		// 	img: this.image,
		// 	description: this.description,
		// });
		// // console.log(products);
		// writeProducts(products);
		const q = `insert into products(id,title,price,imageUrl,description) values(
			'${uuidV4()}','${this.name}',${this.price},'${this.image}','${this.description}'
		)`;
		const result = await excute(q);
		//console.log(result);
		return result;
	}
	public async update(id: string) {
		// const products = (await getProducts()) || [];
		// const idx = products.findIndex(p => p.id === id);
		// if (idx < 0) return;

		// this.id = id;
		// products[idx] = {
		// 	id: id,
		// 	title: this.name,
		// 	imageUrl: this.image,
		// 	price: this.price,
		// 	description: this.description,
		// };
		// writeProducts(products);
		const q = `update products set title='${this.name}',price=${this.price},
			imageUrl='${this.image}',description='${this.description}'
			where id='${id}';
		)`;
	}
}
export default Product;
