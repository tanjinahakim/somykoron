'use client'
import React from 'react';
import create from 'zustand';
import { nanoid } from 'nanoid';

type Task = {
  id: string;
  title: string;
};

type TaskState = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: string, updatedTitle: string) => void;
  deleteTask: (id: string) => void;
};

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: nanoid(), title }],
    })),
  updateTask: (id, updatedTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: updatedTitle } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-white shadow p-4 mb-4 rounded-md"
            >
              <p>{task.title}</p>
              <button
                className="text-red-500"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = React.useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() !== '') {
      addTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="border p-2 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md ml-2"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

const Task= () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded p-6">
          <TaskForm />
        </div>
        <div className="bg-white shadow rounded p-6">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default Task;
