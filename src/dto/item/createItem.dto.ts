import mongoose from "mongoose";

export interface CreateItemDto {
  name: string;
  price: number;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  shopId: mongoose.Types.ObjectId;
}