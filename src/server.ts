import { Request, Response, NextFunction } from "express";
import { BelongsToManyOptions } from "sequelize";
import app from "./app";

// import db from "./db/mysql";
import sequelize from "./db/sequelize";
import Product from "./models/products_sequelize";
import User from "./models/user_sequlize";
import Cart from "./models/cart";
import CartItem from "./models/cart-item";
import Order from "./models/order";
import OrderItem from "./models/order-item";
// 몽고디비
import MongoConnect from "./db/mongo";
import { MongooseConnect } from "./db/mongoose";
import ConnectDb from "./db/mongoose2";

const PORT = 3003;
let server: any;

// MongoConnect()
MongooseConnect()
	// ConnectDb()
	.then(conn => {
		// console.log(conn);
		server = app.listen(PORT, () => {
			console.log("Express Web Server " + PORT + " Running...");
		});
	})
	.catch(err => {
		console.log(err);
	});

/**
 * 처리되지 않은 예외 처리
 * 우하하게 서버 닫기
 * 비동기 예외 처리
 */
process.on("unhandledRejection", (err: any) => {
	console.log("UNHANDLER REJECTION! ❄️ Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

/**
 * 동기오류 예외 잡기
 */
process.on("uncaughtException", (err: any) => {
	console.log("UNCAUGHT EXCEPTION! ❄️ Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

const excuteSequlize = () => {
	return new Promise((reslove, reject) => {
		// 상품은 유저에 속함
		Product.belongsTo(User, {
			constraints: true, // 관계설정 cascade
			onDelete: "CASCADE",
		});
		User.hasMany(Product); // 유저는 많은 상품을 가짐
		//  카드정의
		User.hasOne(Cart); // 사용자는 카드를 하나만 가짐
		Cart.belongsTo(User); // 카트는 사용자에 속한다.
		// M:M
		const cartOptions: BelongsToManyOptions = {
			through: CartItem,
		};
		Product.belongsToMany(Cart, cartOptions);
		Cart.belongsToMany(Product, cartOptions);
		// 오더
		const orderOptions: BelongsToManyOptions = {
			through: OrderItem,
		};
		User.hasMany(Order); // 사용자는 많은 주문을 가질수 있다.
		Order.belongsToMany(Product, orderOptions); // 하나의 주문에 여러개의 제품을 담을수 있다.

		sequelize
			// .sync({ force: true })
			.sync()
			.then(async result => {
				let user = await User.findByPk(1);
				if (!user) {
					user = await User.create({
						name: "Max",
						email: "email@email.com",
						password: "1230",
					});
				}
				// await user.createCart();
				// console.log(user);
				// console.log(result);
				reslove(result);
			})
			.catch(err => {
				console.log(err);
				reject(err);
			});
	});
};
