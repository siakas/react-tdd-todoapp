import type { FormEvent} from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/todoStore";

export const TodoList = () => {
  const [todoText, setTodoText] = useState("");
  const todoList = useTodoStore((state) => state.todoList);
  const addItem = useTodoStore((state) => state.actions.addItem);

  const addTodoItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem({
      id: uuid(),
      title: todoText,
      isCompleted: false,
    });
    setTodoText("");
  };

  return (
    <>
      {/* 入力エリア */}
      <form onSubmit={addTodoItem}>
        <div className="mb-4 flex items-center gap-2">
          <Input
            type="text"
            placeholder="タスクを入力してください"
            value={todoText}
            onInput={(e) => setTodoText(e.currentTarget.value)}
          />
          <Button type="submit" disabled={!todoText}>
            追加
          </Button>
        </div>
      </form>

      <p>{todoText}</p>

      {/* リスト */}
      <ul className="space-y-2">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              "flex justify-between items-center rounded-md border-border border py-2 px-3",
            )}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};
