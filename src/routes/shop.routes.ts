import { FastifyInstance, FastifyRequest } from "fastify";
import { ShopController } from "../controllers/shop.controller";
import { Types } from "mongoose";
import { CreateShopDto } from "../dto/shop/createShop.dto";

export const shopRoutes = (app: FastifyInstance) => {
	const shopController = new ShopController();

	app.get("/shops", async (_, reply) => {
		const shops = await shopController.findAll();
		reply.code(200).send({ data: shops });
	});

	app.get(
		"/shops/:id",
		async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
			const shopId = new Types.ObjectId(request.params.id);
			const shop = await shopController.findOne(shopId);
			if (!shop) {
				reply.code(404).send({ message: "Shop not found" });
			} else {
				reply.code(200).send({ data: shop });
			}
		},
	);

	app.post(
		"/shops",
		async (request: FastifyRequest<{ Body: CreateShopDto }>, reply) => {
			const shop = await shopController.create(request.body);
			reply.code(201).send({ data: shop });
		},
	);

	app.put(
		"/shops/:id",
		async (
			request: FastifyRequest<{ Body: CreateShopDto; Params: { id: string } }>,
			reply,
		) => {
			const shopId = new Types.ObjectId(request.params.id);
			const shop = await shopController.update(shopId, request.body);
			if (!shop) {
				reply.code(404).send({ message: "Shop not found" });
			} else {
				reply.code(200).send({ data: shop });
			}
		},
	);

	app.delete(
		"/shops/:id",
		async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
			const shopId = new Types.ObjectId(request.params.id);
			const deletedShopId = await shopController.remove(shopId);
			if (!deletedShopId) {
				reply.code(404).send({ message: "Shop not found" });
			} else {
				reply.code(200).send({ data: deletedShopId });
			}
		},
	);
};
