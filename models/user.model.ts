import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const oauthSchema = new Schema(
  {
    providerName: {
      type: String,
      enum: ["google", "github"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { _id: false } 
);

const UserModel: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    oauth: [oauthSchema], 
  },
  { collection: "User", timestamps: true }
);

const User = mongoose.model("User", UserModel);
export default User;
