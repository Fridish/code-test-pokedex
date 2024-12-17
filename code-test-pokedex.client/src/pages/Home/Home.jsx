import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Form from "../../components/Form/Form";
import * as styles from "./Home.module.css";

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
  console.log(error);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Pokedex</h1>
      <PokemonCard pokemon={pokemon} />
      <section className={styles.searchErrorContainer}>
        {loading && <div>Searching...</div>}
        {error && <p className={styles.error}>{error.response.data}</p>}
      </section>
      <Form setPokemon={fetchPokemon} />
    </main>
  );
}
