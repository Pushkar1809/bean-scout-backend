import { Types } from "mongoose";
import { CreateShopDto } from "../dto/shop/createShop.dto";
import { ResponseShopDto } from "../dto/shop/ResponseShop.dto";
import { ShopModel } from "../models/shop.model";
import { UpdateItemDto } from '../dto/item/updateItem.dto';

export class ShopController {
	constructor() {}

	async create(createShop: CreateShopDto): Promise<ResponseShopDto> {
		const shop = new ShopModel({
			...createShop,
			created_at: new Date(),
			updated_at: new Date(),
		});
		const shopRes = await shop.save();
		return shopRes;
	}

	async createMultiple(
		data: CreateShopDto[],
	): Promise<ResponseShopDto[]> {
		const createShops = data.map((shop) => ({
			...shop,
			created_at: new Date(),
			updated_at: new Date(),
		}))
 		const shops = await ShopModel.insertMany(createShops);
		return shops;
	}

	async findAll(): Promise<ResponseShopDto[]> {
		const shops = await ShopModel.find();
		return shops;
	}

	async findOne(id: Types.ObjectId): Promise<ResponseShopDto | null> {
		const shop = await ShopModel.findOne({ _id: id });
		return shop;
	}

	async update(
		id: Types.ObjectId,
		updateShop: UpdateItemDto,
	): Promise<ResponseShopDto | null> {
		const existingShop = await ShopModel.findOne({ _id: id });
		if (!existingShop) {
			return null;
		}
		const shop = await ShopModel.findByIdAndUpdate(
			id,
			{ ...existingShop, ...updateShop, updated_at: new Date() },
			{ new: true },
		);
		return shop;
	}

	async remove(id: Types.ObjectId): Promise<string | null> {
		const shop = await ShopModel.findByIdAndDelete(id);
		return shop ? shop._id.toString() : null;
	}
}