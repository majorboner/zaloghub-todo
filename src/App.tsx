import { useState } from "react";
import type { SubmitEvent } from "react";
import { useTodos } from "./useTodos";
import type { Filter } from "./types";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "completed", label: "Выполненные" },
];

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addTodo(text)) {
      setText("");
    }
  };

  return (
    <main className="app">
      <h1>Список задач</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
        />

        <button type="submit" disabled={!text.trim()}>
          Добавить
        </button>
      </form>

      <div className="filters">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? "active" : ""}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty">Задач нет</p>
      ) : (
        <ul className="list">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button type="button" className="delete" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
