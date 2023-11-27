import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { data, isLoading, isError, error } = useSuperHeroData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Hero Page</h2>
      <div>
        {data?.data.name} - {data?.data.alterEgo}
      </div>
    </>
  );
};
