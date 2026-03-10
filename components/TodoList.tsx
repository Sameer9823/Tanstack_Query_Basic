"use client";

import React from "react";
import { useTodos } from "@/hooks/use-create-todo";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Trash2, CheckCircle } from "lucide-react";
import { useTodoStore } from "@/store/todo-store";
import { useDeleteTodo, useUpdateTodo } from "@/hooks/use-create-todo";

type Todo = {
_id: string;
title: string;
description?: string;
priority: "low" | "medium" | "high";
completed?: boolean;
};

function TodoList() {
const { isLoading, isError } = useTodos();

const filteredTodos = useTodoStore((state) => state.filteredTodos());

const deleteTodo = useDeleteTodo();
const updateTodo = useUpdateTodo();

if (isLoading) {
return ( <Card className="w-full"> <CardHeader> <CardTitle>Loading Todos...</CardTitle> </CardHeader>


    <CardContent className="flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </CardContent>
  </Card>
);


}

if (isError) {
return ( <Card className="w-full"> <CardHeader> <CardTitle>Error Loading Todos</CardTitle> </CardHeader>


    <CardContent className="text-red-500">
      Failed to fetch todos. Please try again.
    </CardContent>
  </Card>
);


}

return ( <div className="mt-6 space-y-4">
{filteredTodos && filteredTodos.length > 0 ? (
filteredTodos.map((todo: Todo) => ( <Card key={todo._id} className="w-full"> <CardHeader className="flex flex-row justify-between items-center">
<CardTitle
className={
todo.completed ? "line-through text-gray-400" : ""
}
>
{todo.title} </CardTitle>


          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() =>
                updateTodo.mutate({
                  id: todo._id,
                  completed: !todo.completed,
                })
              }
            >
              <CheckCircle size={18} />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => deleteTodo.mutate(todo._id)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {todo.description && (
            <p className="text-sm text-gray-600">{todo.description}</p>
          )}

          <p className="text-xs text-gray-400 mt-2">
            Priority: {todo.priority}
          </p>
        </CardContent>
      </Card>
    ))
  ) : (
    <Card>
      <CardContent className="text-center py-6 text-gray-500">
        No todos found. Create your first todo 🚀
      </CardContent>
    </Card>
  )}
</div>


);
}

export default TodoList;
