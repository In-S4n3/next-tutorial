import { GetStaticProps, NextPage } from "next";
import { Character, GetCharacterResults } from "../types";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/listOfCharacters.module.css";

const listOfCharacters: NextPage<{ characters: Character[] }> = ({
  characters,
}) => {
  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className={styles.container}>
      {characters.map((character) => {
        return (
          <div key={character.id} className={styles.eachCharacter}>
            <Link href={`/character/${character.id}`} passHref>
              <div >
                <p>{character.name}</p>
                <Image
                  loader={myLoader}
                  unoptimized
                  src={character.image}
                  alt={character.name}
                  height={100}
                  width={100}
                />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await response.json();

  return {
    props: {
      characters: results,
    },
  };
};

export default listOfCharacters;
