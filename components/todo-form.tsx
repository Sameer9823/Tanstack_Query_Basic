"use client";

import React, { useState } from 'react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { todoSchema } from '@/validations/todo';
import { useCreateTodo } from '@/hooks/use-create-todo';
import { toast } from 'sonner';


const TodoForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const createTodoMutation = useCreateTodo();

    const form = useForm({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
        },
    })

    const onSubmit = async (data: any) => {
        try{
            const result = await createTodoMutation.mutateAsync(data);
            if(result.success) {
                toast.success("Todo added successfully");
                form.reset();
                setIsOpen(false);
            } else {
                toast.error("Failed to add todo");
            }
        } catch (error) {
            toast.error("Failed to add todo");

        }
    } 
    if(!isOpen) {
        return (
            <Button onClick={() => setIsOpen(true)}>Add Todo</Button>
        )
    }
  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Add New Todo</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input {...form.register("title")} />
                </div>
                <div>
                    <Label>Description</Label>
                    <Textarea {...form.register("description")} />
                </div>
                <div>
                    <Label>Priority</Label>
                    <Select {...form.register("priority")}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit">Add Todo</Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default TodoForm