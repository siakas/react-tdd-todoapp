import type { FormEvent } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/todoStore";

export const TodoList = () => {
  const [todoText, setTodoText] = useState("");
  const todoList = useTodoStore((state) => state.todoList);
  const addItem = useTodoStore((state) => state.addItem);
  const toggleItem = useTodoStore((state) => state.toggleItem);

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

      {/* リスト */}
      <ul className="space-y-2">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              "flex items-center rounded-md border-border border py-2 px-3",
              todo.isCompleted && "bg-muted",
            )}
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={todo.id}
                checked={todo.isCompleted}
                onCheckedChange={() => toggleItem(todo)}
              />
              <Label
                htmlFor={todo.id}
                className={cn(
                  "cursor-pointer",
                  todo.isCompleted && "line-through",
                )}
              >
                {todo.title}
              </Label>
              <p className="ml-2 text-[10px] text-gray-400">{todo.id}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
