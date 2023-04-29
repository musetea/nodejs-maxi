#

##

- JavaSript -> Node.js Basic -> Efficient Developement -> Express.js -> Templating Engines ->
  Model-View-Controller -> Routes & Model -> Node+Sql(MySql) -> Sequelize -> Node+NoSQL(MongoDB)
  -> Moongoose -> Sessions & Cookies -> Authentication -> Email -> User Input Validation -> Error Handling -> File(UP/DOWN) -> Pagination -> Async Rquests -> Payments -> REST API -> Async/Await -> WebSocket & SocketIO -> GraphQL -> Deployment -> Web Server -> TypeScript+Deno

##

- http, https, fs, path, os
- Syntax, Runtime, Logical Error's

### 디버깅

```json
// launch.json
  "version": "0.2.0",
	"configurations": [
		{
			"type": "pwa-node",
			"request": "launch",
			"name": "Launch Program",
			"skipFiles": ["<node_internals>/**"],
			"program": "${file}",
			"outFiles": ["${workspaceFolder}/**/*.js"],
			"restart": true,
			"runtimeExecutable": "nodemon",
			"console": "integratedTerminal"
		}
	]
```

### Express.js

-`Framework`

```sh
  npm i express
  npm i -D @types/express
  # body
  npm i body-parser
  npm i -D @types/body-parser
```

```ts
// body
app.use(bodyParser.urlencoded({ extended: false })); // form data
app.use(bodyParser.json()); // json
```

## MVC

- Models
- Views
- Controllers
