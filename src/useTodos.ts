import { useEffect, useState } from "react";
import type { Todo } from "./types";

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem("todos");

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (t): t is Todo =>
        typeof t?.id === "string" &&
        typeof t?.text === "string" &&
        typeof t?.completed === "boolean",
    );
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch {
      console.error("Не удалось сохранить задачи в localStorage");
    }
  }, [todos]);

  const addTodo = (text: string): boolean => {
    const trimmed = text.trim();

    if (!trimmed) return false;

    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, completed: false }]);
    return true;
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id: string) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return { todos, addTodo, toggleTodo, deleteTodo };
}
