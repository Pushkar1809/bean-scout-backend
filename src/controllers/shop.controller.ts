import { Types } from "mongoose";
import { CreateShopDto } from "../dto/shop/createShop.dto";
import { ResponseShopDto } from "../dto/shop/ResponseShop.dto";
import { ShopModel } from "../models/shop.model";
import { UpdateItemDto } from '../dto/item/updateItem.dto';

export class ShopController {
  constructor() {}

  async create(createShop: CreateShopDto): Promise<ResponseShopDto> {
    const shop = new ShopModel({
      name: createShop.name,
      address: createShop.address,
      email: createShop.email,
      description: createShop.description,
      status: createShop.status,
      reviewCount: createShop.reviewCount,
      rating: createShop.rating,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const shopRes = await shop.save();
    return shopRes;
  }

  async findAll(): Promise<ResponseShopDto[]> {
    const shops = await ShopModel.find();
    return shops;
  }

  async findOne(id: Types.ObjectId): Promise<ResponseShopDto | null>{
    const shop = await ShopModel.findOne({ _id: id });
    return shop;
  }

  async update(id: Types.ObjectId, updateShop: UpdateItemDto): Promise<ResponseShopDto | null> {
    const shop = await ShopModel.findByIdAndUpdate(id, {...updateShop, updated_at: new Date()}, { new: true });
    return shop;
  }

  async remove(id: Types.ObjectId): Promise<string | null> {
    const shop = await ShopModel.findByIdAndDelete(id);
    return shop ? shop._id.toString() : null;
  }
}