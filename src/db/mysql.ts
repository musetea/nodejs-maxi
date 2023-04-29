import { createPool, Pool, PoolOptions } from "mysql2/promise";

console.log(
	process.env.MYSQL_HOST,
	process.env.MYSQL_DB,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD
);
const options: PoolOptions = {
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DB,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
};

const pool = createPool(options);

export const query = async <T>(q: string) => {
	const conn = await pool.getConnection();
	const [rows, fields] = await conn.query(q);
	conn.release();
	return rows;
};

export const excute = async (q: string) => {
	const conn = await pool.getConnection();
	const [rows, fields] = await conn.execute(q);
	conn.release();
	return rows;
};

export default pool;
