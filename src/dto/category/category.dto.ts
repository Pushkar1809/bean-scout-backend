import { Types } from "mongoose";

export interface Category {
  name: string;
  description: string;
}

export type ResponseCategoryDto = Category & { _id: Types.ObjectId; __v?: number; }