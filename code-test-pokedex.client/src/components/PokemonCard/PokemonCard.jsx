export default function PokemonCard({ pokemon }) {
  return (
    <>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
    </>
  );
}
