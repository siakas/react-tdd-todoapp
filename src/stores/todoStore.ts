import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { Todo } from "@/types/todo";

export type TodoStore = {
  todoList: Todo[];
  addItem: (todo: Todo) => void;
  toggleItem: (todo: Todo) => void;
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todoList: [],
        addItem: (todo) => {
          set(
            (state) => ({ todoList: [...state.todoList, todo] }),
            false,
            "Todo/addItem",
          );
        },
        toggleItem: (todo) => {
          set(
            (state) => ({
              todoList: state.todoList.map((i) => ({
                ...i,
                isCompleted: i.id === todo.id ? !i.isCompleted : i.isCompleted,
              })),
            }),
            false,
            "Todo/toggleItem",
          );
        },
      }),
      {
        name: "TodoStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "TodoStore" },
  ),
);
