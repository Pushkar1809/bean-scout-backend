import { Types } from "mongoose";
import { CreateItemDto } from "../dto/item/createItem.dto";
import { ResponseItemDto } from "../dto/item/responseItem.dto";
import { ItemModel } from "../models/item.model";
import { UpdateItemDto } from "../dto/item/updateItem.dto";

export class ItemController {
	constructor() {}

	async create(createShop: CreateItemDto): Promise<ResponseItemDto> {
		const item = new ItemModel({
			name: createShop.name,
			price: createShop.price,
			description: createShop.description,
			status: createShop.status,
			reviewCount: createShop.reviewCount,
			rating: createShop.rating,
			shopId: createShop.shopId,
			created_at: new Date(),
			updated_at: new Date(),
		});
		const itemRes = await item.save();
		return itemRes;
	}

	async findAll(): Promise<ResponseItemDto[]> {
		const items = await ItemModel.find();
		return items;
	}

	async findOne(id: Types.ObjectId): Promise<ResponseItemDto | null> {
		const item = await ItemModel.findOne({ _id: id });
		return item;
	}

	async update(id: Types.ObjectId, updateItem: UpdateItemDto): Promise<ResponseItemDto | null> {
		const item = await ItemModel.findByIdAndUpdate(id, {...updateItem, updated_at: new Date()}, { new: true });
		return item;
	}

	async remove(id: Types.ObjectId): Promise<string | null> {
		const item = await ItemModel.findByIdAndDelete(id);
		return item ? item._id.toString() : null;
	}
}
