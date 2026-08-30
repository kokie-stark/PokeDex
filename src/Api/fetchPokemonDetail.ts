export type PokemonDetailResponse = {
  name: string;
  sprites: {
    front_default: string;
  };
};

const fetchPokemonDetail = async (name: string): Promise<PokemonDetailResponse> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  return res.json();
};

export default fetchPokemonDetail;
