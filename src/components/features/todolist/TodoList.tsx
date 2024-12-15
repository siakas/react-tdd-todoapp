import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const TodoList = () => {
  return (
    <>
      {/* 入力エリア */}
      <form>
        <div className="mb-4 flex items-center gap-2">
          <Input type="text" placeholder="タスクを入力してください" />
          <Button>追加</Button>
        </div>
      </form>

      {/* リスト */}
      <ul className="space-y-2"></ul>
    </>
  );
};
