import fastify, { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import { shopRoutes } from "./routes/shop.routes";
import { itemRoutes } from "./routes/item.routes";

const app: FastifyInstance = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	},
});

try {
	// const mongodbUrl = process.env.MONGODB_URL;
	// if (!mongodbUrl) {
	//   throw new Error("Failed to connect to MongoDB: MONGODB_URL is not defined.");
	// }
	mongoose.connect(
		"mongodb+srv://admin:O1OXBkutVVuQS3Bi@shopsanditems.yr8knph.mongodb.net/?retryWrites=true&w=majority&appName=ShopsAndItems",
	);
} catch (error) {
	app.log.error(error);
	process.exit(1);
}

app.get("/", async (_, reply) => {
	reply.code(200).send({ message: "Welcome to the Shop API" });
});

shopRoutes(app);
itemRoutes(app);

const start = async () => {
	try {
		await app.listen({ port: Number(process.env.PORT || "8080") });
		const address = app.server.address();
		const port = typeof address === "string" ? address : address?.port;
		app.log.info(`Server listening at port: ${port}`);
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

start();
