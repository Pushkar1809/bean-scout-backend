import mongoose from "mongoose";

export interface Item {
  name: string;
  price: number;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  categoryId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}