# ReactType Todo App

ReactType is a small React, TypeScript, Vite, and Tailwind CSS app that renders a task list on top of a diagonal grid pattern background.

## What It Does

- Shows a todo list with two starter tasks: `Eat` and `Go to Sleep`.
- Lets the user type a new task and add it to the list.
- Prevents empty tasks from being submitted.
- Displays the current number of open tasks.
- Lets the user delete individual tasks.
- Shows a `No tasks yet.` message when the list is empty.
- Wraps the todo UI inside a reusable `Pattern` component that draws a faded diagonal cross-grid background.

## Main Files

- `src/App.tsx` renders the `Pattern` component.
- `src/pattern.tsx` creates the full-screen patterned background and embeds the todo UI above it.
- `src/todo.tsx` contains the todo list state, add-task form, task counter, and delete behavior.
- `src/index.css` imports Tailwind CSS.

## Scripts

Run the local development server:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```
