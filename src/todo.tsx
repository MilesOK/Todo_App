import { type ChangeEvent, type FormEvent, useState } from "react";

type Task = {
  id: string;
  title: string;
};

const initialTasks: Task[] = [
  { id: crypto.randomUUID(), title: "Eat" },
  { id: crypto.randomUUID(), title: "Go to Sleep" },
];


const Todo = () => {
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
    <section className="px-4 py-10 text-slate-950">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm text-slate-600" aria-live="polite">
            {tasks.length} open {tasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>

        <div className="flex gap-3">
          <label htmlFor="new-task" className="sr-only">
            New task
          </label>
          <input
            id="new-task"
            type="text"
            className="min-w-0 flex-1 rounded border border-slate-300 bg-white p-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="What needs doing?"
            value={newTask}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!taskTitle}
            className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add
          </button>
        </div>

        {tasks.length > 0 ? (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-white p-3 shadow-sm"
              >
                <span className="min-w-0 flex-1 break-words">
                  {task.title}
                </span>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="rounded cursor-pointer bg-red-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            No tasks yet.
          </p>
        )}
      </form>
    </section>
  );
};

export default Todo;
