import { AddUserForm } from "@/components/add-user-form";
import TodoFilter from "@/components/todo-filter";
import TodoForm from "@/components/todo-form";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import UserList from "@/components/user-list";
import { User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
   <div className="min-h-screen bg-background">
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Todo List App
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your tasks efficiently with our simple and intuitive todo list application.
          Built with Next.js, React Query, and MongoDB for a seamless experience.
        </p>
      </header>
      <main className="">
        <TodoForm/>
        <TodoFilter/>
        <TodoList/>
      </main>
    </div>
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      &copy; {new Date().getFullYear()} Todo List App. All rights reserved.
    </footer>
   </div>
  );
}
