import "./App.css";
import { Link, Route, Router, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { TodoList } from "./components/TodoList";
import { TodoDetail } from "./components/TodoDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/todo-list">Todo List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/super-heroes" element={<SuperHeroesPage />}></Route>
          <Route
            path="/rq-super-heroes"
            element={<RQSuperHeroesPage />}
          ></Route>
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          ></Route>
          <Route path="/rq-parallel" element={<ParallelQueriesPage />}></Route>
          <Route path="/todo-list" element={<TodoList />}></Route>
          <Route path="/todo-list/:todoId" element={<TodoDetail />}></Route>
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
