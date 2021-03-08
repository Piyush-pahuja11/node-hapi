//require("dotenv").config();
const Hapi = require("@hapi/hapi");
const HapiSwagger = require("hapi-swagger");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Pack = require("./package");
const universalFunctions  = require("./universalFunctions/lib.js")
const constants = require("./config/constant");
const path = require("path");
const Models = require('./models/index');

// global.Models=require

const server = new Hapi.server({
	host: process.env.NODE_HOST,
	port: process.env.NODE_PORT,
	routes: {
		cors: {
			origin: ['*'],
			headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match',"language"],
			additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type"]
		}
	}
});

const init = async function () {
	const swaggerOptions = {
		info: {
			title: process.env.PROJECT_TITLE,
			version: Pack.version
		},
		securityDefinitions: {
			Bearer: {
				type: "apiKey",
				name: "Authorization",
				in: "header"
			}
		},
		schemes: ["http", "https"],
		grouping: "tags",
		sortEndpoints: "ordered",
		consumes: ["application/json"],
		produces: ["application/json"]
	};
	console.log("Register swagger for API documentation...");
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);
	try {
		console.log("Register jwt library");
		await server.register(require("hapi-auth-jwt2"));
		server.auth.strategy("jwt", "jwt", {
			complete: true,
			key: constants.key.privateKey, // secret key
			validate: universalFunctions.validateToken, // validate function defined in Universal function for checking
			verifyOptions: { algorithms: ["HS256"] } // algorithm
		});
		server.auth.default("jwt");
		console.log("Initializing routes...");
		await server.register({
			plugin: require("hapi-auto-route"),
			options: {
				routes_dir: path.join(__dirname, "routes")
			}
		});

		console.log("Checking DB connectivity...");
		try {
			await Models.sequelize.authenticate();
		} catch (err) {
			console.log("Connection to db could not be established",err);
			process.exit();
			return {};
		}
		console.log("Register proxy h2o2...");
		await server.register({ plugin: require("@hapi/h2o2") });
		console.log("Register i18n");
		await server.register({
			plugin: require("hapi-i18n"),
			options: {
				locales: ["ar", "en"],
				directory: __dirname + "/locales",
				languageHeaderField: "language",
				defaultLocale: "en",
				header : "language"
			}
		});
		console.log("Synchronizing models...");
		Models.sequelize.sync().then(() => {
			server.start(() => {
				console.log(
						"Hapi server for Demo",
						server.info.uri
				);
			});
		});


	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Server running at:", server.info.uri);
};
init();
