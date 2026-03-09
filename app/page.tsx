import { AddUserForm } from "@/components/add-user-form";
import UserList from "@/components/user-list";
import { User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Welcome to Next.js and Tanstack Query</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
        <UserList/>
        <AddUserForm />
        </div>
      </div>
    </div>
  );
}
