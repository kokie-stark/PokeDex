export type PokemonListResponse = {
  count: number;
  results: { name: string; url: string }[];
};

const fetchPokemonList = async (page: number, limit = 20): Promise<PokemonListResponse> => {
  const offset = (page - 1) * limit;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonList;
