import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed?: boolean;
};

type TodoStore = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  loading: boolean;

  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  setLoading: (loading: boolean) => void;

  filteredTodos: () => Todo[];
};

export const useTodoStore = create<TodoStore>()(
  devtools((set, get) => ({
    todos: [],
    filter: "all",
    loading: false,

    setTodos: (todos) => set({ todos }),

    addTodo: (todo) =>
      set((state) => ({
        todos: [...state.todos, todo],
      })),

    setFilter: (filter) => set({ filter }),

    setLoading: (loading) => set({ loading }),

    filteredTodos: () => {
      const { todos, filter } = get();

      switch (filter) {
        case "active":
          return todos.filter((todo) => !todo.completed);

        case "completed":
          return todos.filter((todo) => todo.completed);

        default:
          return todos;
      }
    },

    completedCount: () => {
      const { todos } = get();
      return todos.filter((todo) => todo.completed).length;
    },

    activeCount: () => {
      const { todos } = get();
      return todos.filter((todo) => !todo.completed).length;
    },
  })),
);
