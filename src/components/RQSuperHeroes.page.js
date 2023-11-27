import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = () => {
    console.log("successfull fetching");
  };

  const onError = () => {
    console.log("successfull fetching");
  };

  const { isLoading, data, isError, error, isPending, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroData();

  const handlerAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
    setName("");
    setAlterEgo("");
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => {
            setAlterEgo(e.target.value);
          }}
        />
        <button onClick={handlerAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch Heroes</button>

      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
