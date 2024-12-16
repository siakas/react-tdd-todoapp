import { fireEvent, render, screen } from "@testing-library/react";
import { TodoList } from "@/components/features/todolist/TodoList";
import { userEvent } from "@testing-library/user-event";

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
});
