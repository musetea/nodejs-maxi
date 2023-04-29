import fs from "fs";
import path from "path";
import { v4 as uuidV4 } from "uuid";

export interface IProduct {
	id: string;
	name: string;
	img: string;
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

	static async remove(id: string) {
		if (!id) return;
		const products = (await getProducts()) || [];
		const newProducts = products.filter(p => p.id !== id);
		writeProducts(newProducts);
	}

	public async save() {
		// console.log(productPath);
		const products = (await getProducts()) || [];
		products.push({
			id: uuidV4(),
			name: this.name,
			price: this.price,
			img: this.image,
			description: this.description,
		});
		// console.log(products);
		writeProducts(products);
	}
	public async update(id: string) {
		const products = (await getProducts()) || [];
		const idx = products.findIndex(p => p.id === id);
		if (idx < 0) return;

		this.id = id;
		products[idx] = {
			id: id,
			name: this.name,
			img: this.image,
			price: this.price,
			description: this.description,
		};
		writeProducts(products);
	}
}
export default Product;
