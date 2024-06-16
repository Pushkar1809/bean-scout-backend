import { FastifyInstance, FastifyRequest } from "fastify";
import { ItemController } from "../controllers/item.controller";
import { ResponseItemDto } from "../dto/item/responseItem.dto";
import { Types } from "mongoose";
import { CreateItemDto } from "../dto/item/createItem.dto";
import { UpdateItemDto } from "../dto/item/updateItem.dto";

export const itemRoutes = (app: FastifyInstance) => {
	const itemController = new ItemController();

	app.get("/items", async (_, reply) => {
		const items: ResponseItemDto[] = await itemController.findAll();
		reply.code(200).send({ data: items });
	});

	app.get(
		"/items/:id",
		async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
			const itemId = new Types.ObjectId(request.params.id);
			const item: ResponseItemDto | null = await itemController.findOne(itemId);
			if (!item) {
				reply.code(404).send({ message: "Item not found" });
			} else {
				reply.code(200).send({ data: item });
			}
		},
	);

	app.post(
		"/items",
		async (request: FastifyRequest<{ Body: CreateItemDto }>, reply) => {
			const item: ResponseItemDto = await itemController.create(request.body);
			reply.code(201).send({ data: item });
		},
	);

	app.put(
		"/items/:id",
		async (
			request: FastifyRequest<{ Body: UpdateItemDto; Params: { id: string } }>,
			reply,
		) => {
			const itemId = new Types.ObjectId(request.params.id);
			const item: ResponseItemDto | null = await itemController.update(
				itemId,
				request.body,
			);
			if (!item) {
				reply.code(404).send({ message: "Item not found" });
			} else {
				reply.code(200).send({ data: item });
			}
		},
	);

	app.delete(
		"/items/:id",
		async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
			const itemId = new Types.ObjectId(request.params.id);
			const deletedItemId: string | null = await itemController.remove(itemId);
			if (!deletedItemId) {
				reply.code(404).send({ message: "Item not found" });
			} else {
				reply.code(200).send({ data: deletedItemId });
			}
		},
	);
};
