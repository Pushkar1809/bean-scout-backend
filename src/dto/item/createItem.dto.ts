import mongoose from "mongoose";

export interface CreateItemDto {
  name: string;
  price: number;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  shopId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
}