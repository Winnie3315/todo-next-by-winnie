// components/CreateTodo.tsx
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Toaster, toast } from '@/components/ui/toaster';

interface CreateTodoProps {
  onAddTodo: (todo: Todo) => void;
}

interface FormValues {
  task: string;
}

interface Todo {
  id: number;
  task: string;
  isDone: boolean;
}

const CreateTodo: React.FC<CreateTodoProps> = ({ onAddTodo }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.task === '') {
      toast.error('Please enter a task.');
      return;
    }

    onAddTodo({
      id: Date.now(),
      task: data.task,
      isDone: false
    });
    reset();
    toast.success('Task added successfully!');
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Create New Todo</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Create Todo</SheetTitle>
          <SheetDescription>Please enter the task</SheetDescription>
          
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <Input
              {...register('task', { required: 'Task description is required' })}
              placeholder="Task description"
              className="w-full"
            />
            {errors.task && <p className="text-red-600">{errors.task.message}</p>}
            <Button type="submit" className="w-full">Add Task</Button>
          </form>
        </SheetContent>
      </Sheet>

      <Toaster />
    </div>
  );
};

export default CreateTodo;
