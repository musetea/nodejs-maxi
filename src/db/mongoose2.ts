import mongoose from "mongoose";
import { MongooseOptions } from "mongoose";

const password = process.env.MONGDB_PASSWORD || "";
const host = process.env.MONGODB_URL!.replace("<password>", escape(password));
const db = process.env.MONGODB_DB;
const dummy = process.env.MONGODB_URL_DUMMY;
const url = `${host}${db}${dummy}`;
// console.log(url);
let cached = global.mongoose;
if (!cached) {
	cached = global.mongoose = {
		promise: null,
		conn: null,
	};
}

const ConnectDb = async () => {
	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		cached.promise = mongoose
			.set({
				debug: true,
				strictQuery: false,
			})
			.connect(url)
			.then(mongoose => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
};

export default ConnectDb;
