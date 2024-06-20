import { CreateUserDto } from "../dto/user/createUser.dto";
import { ResponseUserDto } from "../dto/user/responseUser.dto";
import { UserModel } from "../models/user.model";
import { Types } from "mongoose";

export class UserController {
	constructor() {}

	async getUserData(access_token: string): Promise<Types.ObjectId> {
		const response = await fetch(
			`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
		);
		const data = await response.json();
		const user = await this.create({
			name: data.name,
			pictureUrl: data.picture,
		});
		return user._id;
	}

	async getUser(id: Types.ObjectId): Promise<ResponseUserDto | null> {
		const user = await UserModel.findOne({ _id: id });
		return user;
	}

	async create(createUser: CreateUserDto) {
		const existingUser = await UserModel.findOne({ name: createUser.name });
		if (existingUser) {
			return existingUser;
		}
		const user = new UserModel({
			...createUser,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
		const createdUser = await user.save();
		return createdUser;
	}

	async updateAddress(
		id: Types.ObjectId,
		address: string,
	): Promise<ResponseUserDto | null> {
		const existingUser = await UserModel.findOne({ _id: id });
		if (!existingUser) {
			return null;
		}
		const user = await UserModel.findByIdAndUpdate(
			id,
			{
				name: existingUser.name,
				pictureUrl: existingUser.pictureUrl,
				createdAt: existingUser.createdAt,
				address: address,
				updatedAt: new Date(),
			},
			{ new: true },
		);
		return user;
	}
}
