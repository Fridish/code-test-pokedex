import React, { useState } from "react";

export default function Form({ setPokemon }) {
  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState("");

  const validateSearchParam = (textInput) => {
    // trim the input to remove any leading or trailing whitespace, then validate the input
    setError("");
    const trimmed = textInput.trim();
    if (trimmed === null || trimmed === "") {
      setError("Input can not be empty");
      return false;
    }
    const numberInput = Number(trimmed);
    if (!isNaN(numberInput)) {
      if (numberInput <= 0 || numberInput >= 1026) {
        setError("Id must be between 1-1025");
        return false;
      }
    } else {
      if (trimmed.length > 11 || trimmed.length < 3) {
        setError("Name must be between 3 and 11 characters long");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  validate input before seending it back
    if (validateSearchParam(pokemonName)) {
      setPokemon(pokemonName.trim());
    }
  };
  const handleChange = (e) => {
    setPokemonName(e.target.value);
  };
  const fetchRandomPokemon = () => {
    const id = Math.floor(Math.random() * 1024) + 1;
    setPokemon(id);
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>Sök efter ett pokémon med hjälp av dess namn eller id</p>
      <button onClick={fetchRandomPokemon}>Hämta slumpmässig pokemon</button>
      <input type="text" value={pokemonName} onChange={handleChange} />
      <button type="submit">Sök</button>
      {error && <p>{error}</p>}
    </form>
  );
}
