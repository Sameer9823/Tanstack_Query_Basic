import mongoose, { Schema, models, model } from "mongoose";

const TodoSchema = new Schema(
{
title: {
type: String,
required: true,
trim: true,
maxlength: 100,
},
description: {
type: String,
maxlength: 500,
},
priority: {
type: String,
enum: ["low", "medium", "high"],
default: "medium",
},
},
{ timestamps: true }
);

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
