import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: false },
  pictureUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model('User', UserSchema);