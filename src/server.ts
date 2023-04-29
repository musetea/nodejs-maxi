import app from "./app";

const PORT = 3003;

const server = app.listen(PORT, () => {
	console.log("Express Web Server " + PORT + " Running...");
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
