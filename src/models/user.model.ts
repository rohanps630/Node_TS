import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  avatar: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export default model<User>("User", userSchema);
