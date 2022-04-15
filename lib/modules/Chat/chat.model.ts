import * as mongoose from "mongoose";
const Schema = mongoose.Schema,
  MODEL = new Schema({
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    receiver: [{ type: String, required: true }],
    sender: { type: String,  required: true },
    isDeleted: { type: Boolean, default: false }
  });

export default mongoose.model("messages", MODEL);
