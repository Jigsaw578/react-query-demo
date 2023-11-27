import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addTodo, fetchTodos } from "../hooks/todoApi";
import { Link } from "react-router-dom";

export const TodoList = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { isLoading, data, isError, error } = useQuery({
    queryFn: async () => {
      const result = await fetchTodos();
      return result;
    },
    queryKey: ["todos"],
  });

  const { mutateAsync: addTodoMutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleAddTodo = async () => {
    try {
      await addTodoMutate({ title });
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  console.log({ isLoading, isError });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>error: {error.message}</h2>;
  }

  return (
    <>
      <h2>TodoList</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add todo</button>
      </div>
      <ul>
        {data?.data.map((todo) => {
          return (
            <li key={todo.id}>
              <Link to={`/todo-list/${todo.id}`}>{todo.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
