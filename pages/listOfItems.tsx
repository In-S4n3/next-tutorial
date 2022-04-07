import { GetStaticProps, NextPage } from "next";
import {Character, GetCharacterResults} from '../types'
import Image from "next/image";

const listOfItems: NextPage <{characters: Character[]}> = ({ characters } ) => {

  const myLoader = ({ src }: {src: string}) => {
    return src
  }

  return (
    <div>
      {characters.map((character) => {
        return <div key={character.id}>{character.name}
        <Image loader={myLoader} unoptimized src={character.image} alt={character.name} height={100} width={100}/>
        </div>;
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

export default listOfItems;
