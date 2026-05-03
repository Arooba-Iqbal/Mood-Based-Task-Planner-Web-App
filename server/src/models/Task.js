import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    completed: { type: Boolean, default: false }  //  IMPORTANT
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);