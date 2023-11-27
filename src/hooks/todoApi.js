import { request } from "../utils/axios-utils";

export const fetchTodos = () => {
  return request({ url: "/todos" });
};

export const fetchTodoById = (id) => {
  return request({ url: `/todos/${id}` });
};

export const addTodo = (todo) => {
  return request({ url: "/todos", method: "post", data: todo });
};
