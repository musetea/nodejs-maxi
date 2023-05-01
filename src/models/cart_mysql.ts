import path from "path";
import fs from "fs";
import { IProduct, getProducts } from "./products_mysql";

interface ICartProudct extends Partial<IProduct> {
	qty: number;
}

interface ICart {
	products: ICartProudct[];
	totalPrice: number;
}

const cartPath = path.join(
	// path.dirname(__filename),
	__dirname,
	"..",
	"data",
	"cart.json"
);

export const getCart = (dir: string = cartPath) => {
	return new Promise<ICart>((reslove, reject) => {
		try {
			let cart: ICart = {
				products: [],
				totalPrice: 0,
			};
			const json = fs.readFileSync(dir, "utf-8").trim();
			// console.log("JSON", json);
			if (json === "") {
				reslove(cart);
			} else {
				reslove(JSON.parse(json));
			}
		} catch (err) {
			console.log(err, "getCart");
			reject(err);
		}
	});
};

const writeCart = (cart: ICart) => {
	//console.log("writeCart", cart);
	const data = JSON.stringify(cart);
	fs.writeFile(cartPath, data, err => {
		if (err) {
			console.log(err);
		}
		console.log("done");
	});
};

class Cart {
	static async addProduct(id: string, price: number, quentity: number = 1) {
		console.log(id, price, quentity);
		let cart: ICart = await getCart();
		//1) 제품정보취득
		const products = await getProducts();
		const findItem = products.find(p => p.id === id);
		const itemPrice = price * quentity;

		// 카트안에서의 정보처리
		const isIdx = cart.products.findIndex(p => p.id === id);
		const isItem = cart.products[isIdx];
		let updateItem: ICartProudct;
		if (isItem) {
			const qty: number = isItem.qty + quentity;
			console.log(qty);
			updateItem = { ...findItem, ...isItem };
			updateItem.qty = qty;
			cart.products[isIdx] = updateItem;
		} else {
			updateItem = {
				id: id,
				price: price,
				qty: quentity,
			};
			cart.products = [...cart.products, updateItem];
			console.log(cart);
		}

		cart.totalPrice = cart.totalPrice + itemPrice;
		//console.log(cart);
		writeCart(cart);
	}
	static removeProduct = async (id: string) => {
		let cart: ICart = await getCart();
		const updateCart = { ...cart };
		const product = updateCart.products.find(p => p.id === id);
		if (!product) return;

		updateCart.products = updateCart.products.filter(p => p.id !== id);
		updateCart.totalPrice -= product.qty * product.price!;

		writeCart(updateCart);
	};
}

export default Cart;
