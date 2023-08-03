import Head from 'next/head';
import PokemonList from '../components/PokemonList';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  font-size: 5vw;
  font-weight: bold;
  text-align: center;
  margin: 5% 0;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (max-width: 3840px) {
    grid-template-columns: repeat(1, 3fr);
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Pokémon Card List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Pokémon Card List</Title>
        <GridWrapper>
          <PokemonList />
        </GridWrapper>
      </main>
    </>
  );
}