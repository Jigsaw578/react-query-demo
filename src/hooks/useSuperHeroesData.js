import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  //   return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const fetchSuperHero = (heroId) => {
  //   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  return request({ url: `/superheroes/${heroId}` });
};

const addSuperHero = (hero) => {
  //   return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: async () => {
      const result = await fetchSuperHeroes();
      return result;
    },
    // enabled: false,

    onSuccess: onSuccess(),
    onError: onError(),
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name);
    //   return superHeroesNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: async () => {
      const result = await fetchSuperHero(heroId);
      return result;
    },
    // enabled: false,
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name);
    //   return superHeroesNames;
    // },
  });
};
