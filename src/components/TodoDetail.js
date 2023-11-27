import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTodoById } from "../hooks/todoApi";

export const TodoDetail = () => {
  const { todoId } = useParams();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["todos", todoId],
    queryFn: async () => {
      const result = await fetchTodoById(todoId);
      return result;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>error: {error.message}</h2>;
  }

  console.log(data);

  return (
    <div>
      <h2>Todo Detail</h2>
      <p>
        {data?.data.id} - {data?.data.title}
      </p>
    </div>
  );
};
