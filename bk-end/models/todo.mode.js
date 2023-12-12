import mongoose from "mongoose";
import { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      require: [true, "please provide the task"],
    },
    status: {
      type: Boolean,
      require: [true, "please provide the status"],
    },
  },
  {
    timestamps: true,
  }
);

export const Todos =
  mongoose.model["todo"] || mongoose.model(`todo`, todoSchema);
