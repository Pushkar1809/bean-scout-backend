import mongoose from "mongoose";

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  status: boolean;
  reviewCount: number;
  rating: number;
  shopId: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}