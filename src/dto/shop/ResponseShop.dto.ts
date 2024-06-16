import { Types } from "mongoose";
import { CreateShopDto } from "./createShop.dto";

export type ResponseShopDto = CreateShopDto & { _id: Types.ObjectId; created_at: Date; updated_at: Date; __v?: number; }