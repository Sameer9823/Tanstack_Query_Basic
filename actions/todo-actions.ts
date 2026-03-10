"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import Todo from "@/model/todo";
import { todoSchema } from "@/validations/todo";
import { z } from "zod";

type TodoInput = z.infer<typeof todoSchema>;

/* ---------- CREATE TODO ---------- */

export async function addTodo(data: TodoInput) {
try {
const validatedData = todoSchema.parse(data);


await connectToDatabase();

const todo = await Todo.create(validatedData);

revalidatePath("/");

return {
  success: true,
  data: JSON.parse(JSON.stringify(todo)),
};


} catch (error) {
console.error("Error adding todo:", error);


return {
  success: false,
  message: "Failed to add todo",
};


}
}

/* ---------- GET TODOS ---------- */

export async function getTodos() {
try {
await connectToDatabase();


const todos = await Todo.find().sort({ createdAt: -1 }).lean();

return {
  success: true,
  data: todos,
};


} catch (error) {
console.error("Error fetching todos:", error);


return {
  success: false,
  message: "Failed to fetch todos",
};


}
}

/* ---------- DELETE TODO ---------- */

export async function deleteTodo(id: string) {
try {
await connectToDatabase();


await Todo.findByIdAndDelete(id);

revalidatePath("/");

return {
  success: true,
};


} catch (error) {
console.error("Error deleting todo:", error);


return {
  success: false,
  message: "Failed to delete todo",
};


}
}

/* ---------- UPDATE TODO ---------- */

export async function updateTodo(data: { id: string; completed: boolean }) {
try {
await connectToDatabase();


const todo = await Todo.findByIdAndUpdate(
  data.id,
  { completed: data.completed },
  { new: true }
);

revalidatePath("/");

return {
  success: true,
  data: JSON.parse(JSON.stringify(todo)),
};


} catch (error) {
console.error("Error updating todo:", error);

return {
  success: false,
  message: "Failed to update todo",
};

}
}
