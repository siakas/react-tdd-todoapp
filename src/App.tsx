import { TodoList } from "@/components/features/todolist/TodoList";
import { Layout } from "@/components/layout/Layout";

function App() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-card-foreground mb-4">
        ToDo List
      </h1>
      <TodoList />
    </Layout>
  );
}

export default App;
