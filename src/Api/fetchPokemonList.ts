export type PokemonListResponse = {
  count: number;
  results: { name: string; url: string }[];
};

export const PokemonListLimit = 20;

const fetchPokemonList = async (page: number): Promise<PokemonListResponse> => {
  const offset = (page - 1) * PokemonListLimit;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PokemonListLimit}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonList;
