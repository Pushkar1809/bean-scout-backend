import { FastifyInstance, FastifyRequest } from "fastify";
import { CategoryController } from "../controllers/category.controller";
import { Category } from "../dto/category/category.dto";

export const categoryRoutes = (app: FastifyInstance) => {
  const categoryController = new CategoryController();
  
  app.get("/categories", async (_, reply) => {
    const categories = await categoryController.findAll();
    reply.code(200).send({ data: categories });
  });

  app.get("/categories/:id", async (request: FastifyRequest<{Params: {id: string}}>, reply) => {
    const category = await categoryController.findById(request.params.id);
    reply.code(200).send({ data: category });
  });

  app.post("/categories", async (request: FastifyRequest<{Body: Category}>, reply) => {
    const category = await categoryController.create(request.body);
    reply.code(201).send({ data: category });
  });
}