import { useState, useEffect } from 'react';
import styled from 'styled-components';
import getPokemonTypes from './getPokemonTypes';
import { effectiveness, colors, compareTypes } from './typeUtils';

const EffectivenessText = styled.p`
  color: ${(props) => colors[props.effectiveness]};
`;

export default function PokemonTypeCompareDisplay({ pokemon1, pokemon2 }) {
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!pokemon1 || !pokemon2) {
      setResult('Please select two Pokémon to compare.');
      return;
    }

    const pokemonTypeCompare = (pokemon1, pokemon2) => {
      const pokemon1Types = getPokemonTypes(pokemon1);
      const pokemon2Types = getPokemonTypes(pokemon2);

      let pokemon1Effectiveness = 1;
      let pokemon2Effectiveness = 1;

      for (let type1 of pokemon1Types) {
        for (let type2 of pokemon2Types) {
          pokemon1Effectiveness *= compareTypes(type1, type2);
          pokemon2Effectiveness *= compareTypes(type2, type1);
        }
      }

      return {
        pokemon1Effectiveness,
        pokemon2Effectiveness,
      };
    };

    const { pokemon1Effectiveness, pokemon2Effectiveness } = pokemonTypeCompare(
      pokemon1,
      pokemon2
    );

    setResult(
      <div>
        <h1>Pokémon Type Compare</h1>
        <h2>
          {pokemon1} vs {pokemon2}
        </h2>
        <p>
          The Type of {pokemon1} is{' '}
          <EffectivenessText
            effectiveness={getEffectivenessText(pokemon1Effectiveness)}
          >
            {getEffectivenessText(pokemon1Effectiveness)}
          </EffectivenessText>{' '}
          against {pokemon2}.
        </p>
        <p>
          The Type of {pokemon2} is{' '}
          <EffectivenessText
            effectiveness={getEffectivenessText(pokemon2Effectiveness)}
          >
            {getEffectivenessText(pokemon2Effectiveness)}
          </EffectivenessText>{' '}
          against {pokemon1}.
        </p>
      </div>
    );
  }, [pokemon1, pokemon2]);

  const getEffectivenessText = (effectivenessValue) => {
    switch (effectivenessValue) {
      case effectiveness.superEffective:
        return 'Super effective!';
      case effectiveness.veryEffective:
        return 'Very effective!';
      case effectiveness.normalEffective:
        return 'Normal effective';
      case effectiveness.notVeryEffective:
        return 'Not very effective...';
      case effectiveness.noEffect:
        return 'No effect';
      default:
        return 'Unknown';
    }
  };

  return result;
}
