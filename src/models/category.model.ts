import { model, Schema } from "mongoose";
import { Category } from "../dto/category/category.dto";

export const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export const CategoryModel = model<Category>("Category", categorySchema);