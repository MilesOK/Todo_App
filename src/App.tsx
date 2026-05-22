import { type FormEvent, useState } from "react";
import Pattern from "./pattern";
import Todo from "./todo";

const App = () => {
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");

  const trimmedName = nameInput.trim();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trimmedName) return;

    setUserName(trimmedName);
    setNameInput("");
  };

  const handleLogout = () => {
    setUserName("");
  };

  return (
    <Pattern>
      {userName ? (
        <Todo userName={userName} onLogout={handleLogout} />
      ) : (
        <section className="animate-fade-slide-up px-4 py-10 text-slate-950">
          <form
            onSubmit={handleLogin}
            className="mx-auto flex w-full max-w-sm flex-col gap-5 rounded border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="text-sm text-slate-600">
                Enter your name to open your todo list.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="user-name" className="text-sm font-semibold">
                Name
              </label>
              <input
                id="user-name"
                type="text"
                className="w-full rounded border border-slate-300 bg-white p-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                autoComplete="name"
              />
            </div>

            <button
              type="submit"
              disabled={!trimmedName}
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Sign in
            </button>
          </form>
        </section>
      )}
    </Pattern>
  );
};

export default App;
