import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Form from "../../components/Form/Form";

export default function Home() {
  //Try connetction by setting the url to the api using a random id
  const [searchParam, setSearchParam] = useState(null);
  const {
    data: pokemon,
    loading,
    error,
  } = useFetch(
    searchParam ? `http://localhost:5176/api/pokemon/${searchParam}` : null
  );

  const fetchPokemon = (textInput) => {
    setSearchParam(textInput);
  };

  return (
    <>
      <h1>Pokedex</h1>
      <Form setPokemon={fetchPokemon} />
      {loading && <div>Loading...</div>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
      {error && <div>{error.message}</div>}
    </>
  );
}
