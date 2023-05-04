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

## 데이터베이스

- SQL : mySql
  - 테이블 기준의 관계.
- NoSQL: MongoDB
  - 컬렉션, 중복허용
- 스케일링
  - 수직 : 메모리,cpu 를 늘려서 확장. -> SQL
  - 수평 : 데이터베이스 서버를 확장. -> NO SQL
    -MySQL

```sh
	npm i mysql2
```

```ts
const mysql = require("mysql2");
// create the pool
const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "test",
});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// query database using promises
const [rows, fields] = await promisePool.query("SELECT 1");
```

## sequelize

- Object-Relational Mapping Library

```sh
	npm i sequelize
	npm i @types/sequelize
```

```ts
	const { Sequelize } = require('sequelize');
	const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
	// 연결
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	});
	// 연결해지
	await sequelize.close()
```

## 몽고디비

- mongodb
- mongoose
- @types/... 추가설치 안해도 됨.

## 쿠키 & 섹션

### 쿠키설정

```ts
req.setHeader("Set-Cookie", "name=value");
// express 에서 설정
res.cookie("key", "value", { maxAge: 900000, httpOnly: true });
```

```sh
	npm i cookie-parser
	npm i @types/cookie-parser -D
```

```ts
declare global {
	namespace Express {
		// Inject additional properties on express.Request
		interface Request {
			/**
			 * This request's secret.
			 * Optionally set by cookie-parser if secret(s) are provided.  Can be used by other middleware.
			 * [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) can be used to add your own properties.
			 */
			secret?: string;
		}
	}
}
```

### 셕션

[EXPRESS-SESSION](https://github.com/expressjs/session)

```sh
	npm i express-session
	npm i @types/express-session
```

- `resave:false` : 섹션이 변경되었을때만 저장됨.
- `saveUninitialized:false` : - 초기화되지 않은 섹션은 저장 안함. 로그인,저장소사용량
  등 도움됨.
- [몽고디비 섹션 저장소](https://www.npmjs.com/package/connect-mongodb-session)

```sh
	npm i connect-mongodb-session
	npm i @types/connect-mongodb-session
	# redis
	npm i connect-redis
	npm i @types/connect-redis
```

```ts
// 섹션에 변수 추가 정의

declare module "express-session" {
	interface SessionData {
		isLogin: boolean;
	}
}
```

## 인증

- User 의 의미 : 페이지에 방문한 익명의 사용자
- 모든 제품은 볼수 있다.
- 로그인한 사용자
- 모든제품 및 제품을 구매가능하다.

### 인증구현

1. 로그인 요청
2. 섹션생성 및 (session_id ) 쿠키 제공

3. 비밀번호 암호화 (bcryptjs) 보다 빠름

```
	npm i bcrypt
    npm i -D @types/bcrypt
```

4. CSRF Attacks

- Cross Site Request Forgery
- CSRF 토근사용
- [CSRF-CSRF](https://www.npmjs.com/package/csrf-csrf)

```sh
	# 삭제됨
	npm i csurf
	# 대체
	npm i csrf-csrf
```

```ts
import csrf from "csurf";
const csrfProtection = csrf();
app.use(csrfProtection);
```

## 사용자 피드백

[connect-flash]()

```sh
	#
	npm i connect-flash
	npm i -D @types/connect-flash

```

## 이메일 전송

### 메일서버

- SendGrid

```
	npm i nodemailer;
	npm i nodemailer-sendgrid npm i -D @types/nodemailer-sendgrid;
	# 사용안함
	npm i nodemailer-sendgrid-transport
```

- Nodemailer
