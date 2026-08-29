export type PokemonListResponse = {
  results: { name: string; url: string }[];
};

const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonList;
