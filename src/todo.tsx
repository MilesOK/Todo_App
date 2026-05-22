import { type ChangeEvent, type FormEvent, useState } from "react";

type Task = {
  id: string;
  title: string;
};


const initialTasks: Task[] = [];


type TodoProps = {
  userName: string;
};

const Todo = ({ userName }: TodoProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const taskTitle = newTask.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskTitle) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title: taskTitle },
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

  return (
    <section className="animate-fade-slide-up px-4 py-10 text-slate-950">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-slate-600" aria-live="polite">
            {tasks.length} open {tasks.length === 1 ? "task" : "tasks"}
          </p>
          <p>Welcome, {userName}!</p>
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
                <span className="min-w-0 flex-1 break-words">
                  {task.title}
                </span>

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
