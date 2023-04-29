import dotenv from "dotenv";
import path from "path";

const configDir = path.join(__dirname, "..", "config.env");
console.log(configDir);

export const config = () => {
	dotenv.config({
		path: configDir,
	});
	// console.log(process.env);
};
