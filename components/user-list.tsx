"use client";
import { useQuery } from '@tanstack/react-query';
import React from 'react'




async function fetchUsers() {
    const response = await fetch("/api/users");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
    
}

const UserList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && (
            <ul className="space-y-2">
                {data.map((user: { id: number; name: string; email: string }) => (
                    <li key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default UserList