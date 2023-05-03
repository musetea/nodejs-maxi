import { connect, Mongoose } from "mongoose";

const password = process.env.MONGDB_PASSWORD || "";
const host = process.env.MONGODB_URL!.replace("<password>", escape(password));
const db = process.env.MONGODB_DB;
const dummy = process.env.MONGODB_URL_DUMMY;
const url = `${host}${db}${dummy}`;
// console.log(url);

let _db: Mongoose;

export const MongooseConnect = async () => {
	const connection = await connect(url, {});
	_db = connection;
	return connection;
};

export const getDb = () => {
	if (_db) {
		return _db;
	}
	throw new Error("몽구즈 연결 오류!!");
};
