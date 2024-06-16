import { Schema, model } from "mongoose";
import { Shop } from "../dto/shop/shop.model.dto";

const shopSchema = new Schema<Shop>(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		email: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: Boolean, required: true },
		reviewCount: { type: Number, required: true },
		rating: { type: Number, required: true },
		created_at: { type: Date, required: true },
		updated_at: { type: Date, required: true },
	},
	{
		timestamps: true,
	},
);

export const ShopModel = model<Shop>("Shop", shopSchema);
