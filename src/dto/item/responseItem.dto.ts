import { Types } from "mongoose";
import { CreateItemDto } from "./createItem.dto";

export type ResponseItemDto = CreateItemDto & { _id: Types.ObjectId; created_at: Date; updated_at: Date; __v?: number; }