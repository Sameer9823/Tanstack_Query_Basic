"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function AddUserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newUser: { name: string; email: string }) => {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setName("");
            setEmail("");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ name, email });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
                Add User
            </button>
        </form>
    );
}