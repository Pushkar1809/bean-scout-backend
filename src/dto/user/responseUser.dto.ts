import { Types } from "mongoose";
import { User } from "./user.model.dto";

export type ResponseUserDto = User & { _id: Types.ObjectId; __v?: number; }; 