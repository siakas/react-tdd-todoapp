import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { Todo } from "@/types/todo";

export type TodoStore = {
  todoList: Todo[];
  actions: {
    addItem: (todo: Todo) => void;
    toggleItem: (todo: Todo) => void;
  };
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todoList: [],
        actions: {
          addItem: (todo) =>
            set((state) => ({ todoList: [...state.todoList, todo] })),
          toggleItem: (todo) =>
            set((state) => ({
              todoList: state.todoList.map((i) => ({
                ...i,
                isCompleted: i.id === todo.id ? !i.isCompleted : i.isCompleted,
              })),
            })),
        },
      }),
      {
        name: "todoStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "todoStore" },
  ),
);
