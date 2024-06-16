import { Category, ResponseCategoryDto } from "../dto/category/category.dto";
import { CategoryModel } from "../models/category.model";

export class CategoryController {
  constructor() {}

  async create (createCategory: Category): Promise<ResponseCategoryDto> {
    const category = new CategoryModel({
      ...createCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const categoryRes = await category.save();
    return categoryRes;
  }

  async findAll (): Promise<ResponseCategoryDto[]> {
    const categories = await CategoryModel.find();
    return categories;
  }
}