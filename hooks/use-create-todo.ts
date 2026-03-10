import { addTodo, getTodos, deleteTodo, updateTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { todoSchema } from "@/validations/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

type TodoInput = z.infer<typeof todoSchema>;

type Todo = {
_id: string;
title: string;
description?: string;
priority: "low" | "medium" | "high";
completed?: boolean;
};

export const todoKeys = {
all: ["todos"] as const,
lists: () => [...todoKeys.all, "list"] as const,
detail: (id: string) => [...todoKeys.all, "detail", id] as const,
};

/* ---------------- CREATE TODO ---------------- */

export const useCreateTodo = () => {
const queryClient = useQueryClient();
const addTodoStore = useTodoStore((state) => state.addTodo);

return useMutation({
mutationFn: (data: TodoInput) => addTodo(data),


onSuccess: (result:any) => {
  if (result.success) {
    addTodoStore(result.data);

    queryClient.invalidateQueries({
      queryKey: todoKeys.lists(),
    });
  }
},


});
};

/* ---------------- GET TODOS ---------------- */

export const useTodos = () => {
const setTodos = useTodoStore((state) => state.setTodos);

return useQuery<Todo[]>({
queryKey: todoKeys.lists(),
queryFn: async () => {
  const result = await getTodos();

  if (result.success) {
    setTodos(result.data);
    return result.data;
  }

  throw new Error("Failed to fetch todos");
},


});
};

/* ---------------- DELETE TODO ---------------- */

export const useDeleteTodo = () => {
const queryClient = useQueryClient();

return useMutation({
mutationFn: (id: string) => deleteTodo(id),


onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: todoKeys.lists(),
  });
},


});
};

/* ---------------- UPDATE TODO ---------------- */

export const useUpdateTodo = () => {
const queryClient = useQueryClient();

return useMutation({
mutationFn: (data: { id: string; completed: boolean }) =>
updateTodo(data),


onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: todoKeys.lists(),
  });
},


});
};
