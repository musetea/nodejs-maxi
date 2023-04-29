import { createServer, IncomingMessage, ServerResponse } from "http";
import { writeFile } from "fs";
const httpListener = (req: IncomingMessage, res: ServerResponse) => {};

const getHtml = (title: string, template: string) => {
	return `
        
    <html>
    <head>
        <title>${title}</title>
    </head>
    <body>
        ${template}
    </body>
    </html>

    `;
};

const http = createServer((req, res) => {
	const { url, method, headers } = req;
	console.log(url, method);

	if (url === "/") {
		const html = getHtml(
			"Node.Js",
			`<form action="/message" method="POST">
			    <input type="text" / name="todo">
			    <button type="submit">send</button>
		    </form>`
		);
		res.write(html);
		return res.end();
	}
	if (url === "/message" && method === "POST") {
		console.log("/message, post");
		const buff: Uint8Array[] = [];
		req.on("data", chunk => {
			console.log("data");
			console.log("chunk", chunk);
			buff.push(chunk);
		});
		return req.on("end", () => {
			console.log("end", buff);
			const body = Buffer.concat(buff).toString();
			const msg = body.split("=")[1];
			writeFile("msg.txt", msg, err => {
				console.log(msg);
				res.statusCode = 302;
				res.setHeader("Location", "/");
				return res.end();
			});
		});
	}
	res.write(getHtml("Index", "<h1>Node.js</h1>"));
	res.end();
});
http.listen(3003, () => {
	console.log("Http server linstening for port " + 3003);
});
