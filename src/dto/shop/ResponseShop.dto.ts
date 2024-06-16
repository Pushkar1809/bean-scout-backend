import { Types } from "mongoose";
import { CreateShopDto } from "./createShop.dto";

export type ResponseShopDto = CreateShopDto & { _id: Types.ObjectId; __v?: number; }