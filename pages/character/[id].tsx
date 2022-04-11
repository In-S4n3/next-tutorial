import { GetStaticPaths, GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import styles from "../../styles/character.module.css";
import { Character, GetCharacterResults } from "../../types";

const Character = ({ character }: { character: Character }) => {
  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className={styles.container}>
      <div className={styles.character}>
        <h1 className={styles.title}>{character.name}</h1>
        <Image
          className={styles.image}
          loader={myLoader}
          unoptimized
          src={character.image}
          alt={character.name}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Call an external API endpoint to get all characters
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const { results }: GetCharacterResults = await res.json();

//   // Get the paths we want to pre-render based on characters
//   const paths = results.map((character) => ({
//     params: { id: String(character.id) },
//   }));
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// };

// // This also gets called at build time
// export const getStaticProps = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   // params contains the character `id`.
//   // If the route is like /character/1, then params.id is 1
//   const res = await fetch(
//     `https://rickandmortyapi.com/api/character/${params.id}`
//   );
//   const character = await res.json();

//   // Pass post data to the page via props
//   return { props: { character } };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  // params contains the character `id`.
  // If the route is like /character/1, then params.id is 1
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();

  // Pass post data to the page via props
  return { props: { character } };
};

export default Character;
