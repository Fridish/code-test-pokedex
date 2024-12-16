import * as styles from "./PokemonCard.module.css";
export default function PokemonCard({ pokemon }) {
  return (
    <main className={styles.container}>
      {pokemon.name === undefined ? (
        <img
          className={styles.image}
          src="../../../public/quizhead1.jpg"
          alt="Loading"
        />
      ) : (
        <>
          <h2 className={styles.title}>
            #{pokemon.id} {pokemon.name.toUpperCase()}
          </h2>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
        </>
      )}
    </main>
  );
}
