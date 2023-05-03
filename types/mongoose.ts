import { Mongoose } from "mongoose";

/**
 * var 로 선언해서 전역적으로 사용
 */
declare global {
	var mongoose: {
		promise: Promise<Mongoose> | null;
		conn: Mongoose | null;
	};
}
