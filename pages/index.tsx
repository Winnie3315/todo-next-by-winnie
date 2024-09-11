import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@/components/ui/table';
import CreateTodo from '@/components/CreateTodo';

type Todo = {
  id: number;
  task: string;
  isDone: boolean;
};

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'not done'>('all');
  const [sortBy, setSortBy] = useState<'task' | 'status'>('task');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddTodo = (task: string) => {
    const newTodo = {
      id: todos.length + 1,
      task,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const sortedTodos = todos
    .filter(todo => {
      if (statusFilter === 'done') return todo.isDone;
      if (statusFilter === 'not done') return !todo.isDone;
      return true;
    })
    .filter(todo => todo.task.includes(filter))
    .sort((a, b) => {
      if (sortBy === 'task') {
        const taskA = a.task
        const taskB = b.task
        return sortOrder === 'asc' ? taskA.localeCompare(taskB) : taskB.localeCompare(taskA);
      }
      return 0;
    });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <CreateTodo onAddTodo={handleAddTodo} />

      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Filter tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2 mb-4"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'done' | 'not done')}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="not done">Not Done</option>
        </select>
      </div>

      {isClient && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'task'}
                  direction={sortOrder}
                  onClick={() => {
                    setSortBy('task');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Task
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTodos.map(todo => (
              <TableRow key={todo.id}>
                <TableCell>{todo.task}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => handleToggleDone(todo.id)}
                  >
                    {todo.isDone ? 'Done' : 'Not Done'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TodoList;
