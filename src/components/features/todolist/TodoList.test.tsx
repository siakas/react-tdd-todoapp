import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TodoList } from "@/components/features/todolist/TodoList";

describe("TodoList", () => {
  it("初期状態では空のリストが表示される", () => {
    render(<TodoList />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("入力エリアと追加ボタンが表示される", () => {
    render(<TodoList />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("新しい Todo を追加できる", async () => {
    render(<TodoList />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "追加" });

    await userEvent.type(input, "テストタスクを追加");
    fireEvent.click(addButton);

    expect(screen.getByText("テストタスクを追加")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  // Todo のチェックボックスをチェックすると Todo が完了になり、タスクに打ち消し線のスタイルが適用される
  it("Todo を完了できる", async () => {
    render(<TodoList />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "追加" });

    await userEvent.type(input, "テストタスクを追加");
    fireEvent.click(addButton);

    const todoItem = screen.getByText("テストタスクを追加");
    expect(todoItem).not.toHaveStyle("text-decoration: line-through");

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(todoItem).toHaveStyle("text-decoration: line-through");
  });
});
