import { Types } from "mongoose";
import { CreateItemDto } from "../dto/item/createItem.dto";
import { ResponseItemDto } from "../dto/item/responseItem.dto";
import { ItemModel } from "../models/item.model";
import { UpdateItemDto } from "../dto/item/updateItem.dto";

export class ItemController {
	constructor() {}

	async create(createShop: CreateItemDto): Promise<ResponseItemDto> {
		const item = new ItemModel({
			...createShop,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		const itemRes = await item.save();
		return itemRes;
	}

	async findByShopId(shopId: Types.ObjectId): Promise<ResponseItemDto[]> {
		const items = await ItemModel.find({ shopId });
		return items;
	}

	async createMultiple(data: CreateItemDto[]): Promise<ResponseItemDto[]> {
		const createItems = data.map((item) => ({
			...item,
			createdAt: new Date(),
			updatedAt: new Date(),
		}));
		const items = await ItemModel.insertMany(createItems);
		return items;
	}

	async findAll(): Promise<ResponseItemDto[]> {
		const items = await ItemModel.find();
		return items;
	}

	async findAllByCategory(categoryId: Types.ObjectId): Promise<ResponseItemDto[]> {
		const items = await ItemModel.find({ categoryId });
		return items;
	}

	async findByCategoryIdAndShopId(
		shopId: Types.ObjectId,
		categoryId: Types.ObjectId,
	): Promise<ResponseItemDto[]> {
		const items = await ItemModel.find({ shopId, categoryId });
		return items;
	}

	async findOne(id: Types.ObjectId): Promise<ResponseItemDto | null> {
		const item = await ItemModel.findOne({ _id: id });
		return item;
	}

	async update(
		id: Types.ObjectId,
		updateItem: UpdateItemDto,
	): Promise<ResponseItemDto | null> {
		const existingItem = await ItemModel.findOne({ _id: id });
		if (!existingItem) {
			return null;
		}
		const item = await ItemModel.findByIdAndUpdate(
			id,
			{ 
				name: updateItem?.name || existingItem.name,
				price: updateItem?.price || existingItem.price,
				description: updateItem?.description || existingItem.description,
				status: updateItem?.status || existingItem.status,
				reviewCount: updateItem?.reviewCount || existingItem.reviewCount,
				rating: updateItem?.rating || existingItem.rating,
				imageUrl: updateItem?.imageUrl || existingItem.imageUrl,
				categoryId: updateItem?.categoryId || existingItem.categoryId,
				createdAt: existingItem.createdAt,
				updatedAt: new Date(),
			 },
			{ new: true },
		);
		return item;
	}

	async remove(id: Types.ObjectId): Promise<string | null> {
		const item = await ItemModel.findByIdAndDelete(id);
		return item ? item._id.toString() : null;
	}
}
