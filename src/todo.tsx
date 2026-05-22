import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};


const initialTasks: Task[] = [];


type TodoProps = {
  userName: string;
  onLogout: () => void;
};

const getStorageKey = (userName: string) => `todo-tasks-${userName}`;

const getSavedTasks = (userName: string): Task[] => {
  const savedTasks = localStorage.getItem(getStorageKey(userName));

  if (!savedTasks) return initialTasks;

  try {
    const parsedTasks = JSON.parse(savedTasks) as Task[];

    if (!Array.isArray(parsedTasks)) return initialTasks;

    return parsedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: Boolean(task.completed),
    }));
  } catch {
    return initialTasks;
  }
};

const Todo = ({ userName, onLogout }: TodoProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => getSavedTasks(userName));
  const [newTask, setNewTask] = useState("");
  const taskTitle = newTask.trim();
  const openTasks = tasks.filter((task) => !task.completed).length;

  useEffect(() => {
    localStorage.setItem(getStorageKey(userName), JSON.stringify(tasks));
  }, [tasks, userName]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskTitle) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title: taskTitle, completed: false },
    ]);
    setNewTask("");
  };

  const deleteTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const toggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <section className="animate-fade-slide-up px-4 py-10 text-slate-950">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <p className="text-sm text-slate-600" aria-live="polite">
              {openTasks} open {openTasks === 1 ? "task" : "tasks"}
            </p>
            <p>Welcome, {userName}!</p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 active:translate-y-0"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            type="text"
            className="min-w-0 flex-1 rounded border border-slate-300 bg-white p-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="What needs doing?"
            value={newTask}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!taskTitle}
            className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Add
          </button>
        </div>

        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="animate-task-pop flex items-center justify-between gap-4 rounded border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 transition duration-200 focus:ring-2 focus:ring-blue-300"
                  />
                  <span
                    className={`min-w-0 flex-1 break-words transition duration-200 ${
                      task.completed ? "text-slate-400 line-through" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="cursor-pointer rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 active:translate-y-0"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="animate-task-pop rounded border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            No tasks yet.
          </p>
        )}
      </form>
    </section>
  );
};

export default Todo;
