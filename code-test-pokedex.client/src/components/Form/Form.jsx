import { useState, useEffect } from "react";
import * as styles from "./Form.module.css";

export default function Form({ setPokemon }) {
  const [pokemonName, setPokemonName] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
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
      if (numberInput <= 0) {
        setError("Id must be greater than 0");
        return false;
      }
    } else {
      if (trimmed.length > 20 || trimmed.length < 3) {
        setError("Name must be between 3 and 20 characters");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    // verify the input field after a delay to indicate to the user if their value is acceptable
    const timeOutId = setTimeout(() => {
      setDebouncedInputValue(pokemonName);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [pokemonName, 300]);

  useEffect(() => {
    if (debouncedInputValue) {
      validateSearchParam(debouncedInputValue);
    }
  }, [debouncedInputValue, validateSearchParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //  validate input before seending it back
    if (validateSearchParam(pokemonName)) {
      if (!error === "") {
        error = "";
      }
      setPokemon(pokemonName.trim());
    }
  };
  const handleChange = (e) => {
    setPokemonName(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* <small className={styles.helperText}>
          Sök efter en pokémon med hjälp av dess namn eller id
        </small> */}
        <section className={styles.inputContainer}>
          <input
            className={error ? styles.invalidInput : styles.input}
            type="text"
            value={pokemonName}
            onChange={handleChange}
            placeholder="Search for name or id"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </section>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </>
  );
}
