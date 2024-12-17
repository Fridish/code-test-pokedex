import * as styles from "./PokemonCard.module.css";
export default function PokemonCard({ pokemon }) {
  console.log(pokemon);

  switch (true) {
    case !pokemon:
      return (
        <main className={styles.container}>
          <img
            className={styles.image}
            src="https://media4.giphy.com/media/2LCShTQ47tfBSISrt0/giphy.gif?cid=6c09b9526grtu3mjqx0x6vfjtyiy8l0mruvarcua0zqzyic1&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"
            alt="Loading"
          />
        </main>
      );
    case pokemon.name === undefined:
      return (
        <main className={styles.container}>
          <img
            className={styles.image}
            src="../../../public/quizhead1.jpg"
            alt="Loading"
          />
        </main>
      );
    default:
      return (
        <main className={styles.container}>
          <h2 className={styles.title}>
            #{pokemon.id} {pokemon.name?.toUpperCase()}
          </h2>
          <img
            className={styles.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
        </main>
      );
  }
}
