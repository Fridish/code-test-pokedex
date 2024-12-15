import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Home() {
    //Try connetction by setting the url to the api using a random id
    const [randomId, setRandomId] = useState(null);
    const { data: pokemon, loading, error } = useFetch(
        randomId != null ? `http://localhost:5176/api/pokemon/${randomId}` : null
    );

    const fetchRandomPokemon = () => {
        const id = Math.floor(Math.random() * 1024) + 1;
        setRandomId(id);
    };
if (pokemon){
    console.log(pokemon)
}
    return (
        <div>
            <h1>Pokedex</h1>
            <p>Search for an id or pokemon name to find a specific pokemon</p>
            <input type="text" />
            <button onClick={fetchRandomPokemon}>Fetch random pokemon</button>
            {loading && <div>Loading...</div>}
            {pokemon && <div>{JSON.stringify(pokemon)}</div>}
            {error && <div>{error.message}</div>}
        </div>
    );
}