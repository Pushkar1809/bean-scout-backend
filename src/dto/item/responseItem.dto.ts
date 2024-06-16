import { Types } from "mongoose";
import { CreateItemDto } from "./createItem.dto";

export type ResponseItemDto = CreateItemDto & { _id: Types.ObjectId; createdAt: Date; updatedAt: Date; __v?: number; }