import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../utils/renderWithRouter';

const isFavorite = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testes do componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isFavorite }
        pokemons={ pokemons }
      />,
    );
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('Se é exibido o próximo pokémon, quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isFavorite }
        pokemons={ pokemons }
      />,
    );
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const nextPokemon = screen.getByRole('img', { name: /charmander sprite/i });
    expect(nextPokemon).toBeInTheDocument();
    const maxNumber = 8;
    let minNumber = 0;
    while (minNumber < maxNumber) {
      minNumber += 1;
      userEvent.click(button);
    }
    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isFavorite }
        pokemons={ pokemons }
      />,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => expect(button).toBeInTheDocument());
    const maxAssertions = 7;
    expect.assertions(maxAssertions);
  });

  test('Selecionado um botão, deve circular apenas pelos pokémons daquele tipo', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isFavorite }
        pokemons={ pokemons }
      />,
    );
    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    const charmander = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmander).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    const rapidash = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(rapidash).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        isPokemonFavoriteById={ isFavorite }
        pokemons={ pokemons }
      />,
    );
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    const firstPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByRole('img', { name: /charmander sprite/i });
    expect(secondPokemon).toBeInTheDocument();
  });
});
