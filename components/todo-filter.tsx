"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTodoStore } from "@/store/todo-store";

const TodoFilter = () => {
const { filter, setFilter, todos } = useTodoStore();

const activeCount = todos.filter((todo) => !todo.completed).length;
const completedCount = todos.filter((todo) => todo.completed).length;

const filters = [
{ key: "all", label: `All (${todos.length})` },
{ key: "active", label: `Active (${activeCount})` },
{ key: "completed", label: `Completed (${completedCount})` },
] as const;

return ( <Card className="w-full"> <CardHeader> <CardTitle>Filters</CardTitle> </CardHeader>


  <CardContent className="flex gap-2">
    {filters.map((item) => (
      <Button
        key={item.key}
        variant={item.key === filter ? "default" : "secondary"}
        onClick={() => setFilter(item.key)}
      >
        {item.label}
      </Button>
    ))}
  </CardContent>
</Card>


);
};

export default TodoFilter;
