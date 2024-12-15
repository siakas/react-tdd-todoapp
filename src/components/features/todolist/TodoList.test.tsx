import { render, screen } from "@testing-library/react";
import { TodoList } from "@/components/features/todolist/TodoList";

describe("TodoList", () => {
  it("初期状態では空のリストが表示される", () => {
    render(<TodoList />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
