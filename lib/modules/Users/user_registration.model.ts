import * as mongoose from "mongoose";
const Schema = mongoose.Schema,
  MODEL = new Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });

export default mongoose.model("users", MODEL);
