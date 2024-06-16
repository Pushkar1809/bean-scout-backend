import { Schema, model } from "mongoose";
import { Item } from "../dto/item/item.model.dto";

const itemSchema = new Schema<Item>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		status: { type: Boolean, required: true },
		reviewCount: { type: Number, required: true },
		rating: { type: Number, required: true },
		shopId: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
		created_at: { type: Date, required: true },
		updated_at: { type: Date, required: true },
	},
	{ timestamps: true },
);

export const ItemModel = model<Item>("Item", itemSchema);
