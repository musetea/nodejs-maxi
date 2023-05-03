import { MongoClient, MongoClientOptions, Db } from "mongodb";

const password = process.env.MONGDB_PASSWORD || "";
const host = process.env.MONGODB_URL!.replace("<password>", escape(password));
const db = process.env.MONGODB_DB;
const dummy = process.env.MONGODB_URL_DUMMY;
const url = `${host}${db}${dummy}`;
//console.log(url);

const options: MongoClientOptions = {};
let _db: Db;
/**
 * 몽고디비 연결객체 반환
 * @returns
 */
const connect = () => {
	return new Promise<MongoClient>(async (reslove, reject) => {
		try {
			const connection = await MongoClient.connect(url, options);
			_db = connection.db();
			reslove(connection);
		} catch (err) {
			console.log(err);
			reject(err);
		}
	});
};

export const getDb = () => {
	if (_db) return _db;
	throw new Error("Mongodb Database is null");
};

export default connect;
