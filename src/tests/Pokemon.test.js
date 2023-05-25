import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokemon from '../components/Pokemon';

const POKEMON = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
};

describe('Testes do componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ POKEMON } isFavorite />);
    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
    const type = screen.getAllByTestId('pokemon-type')[0];
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(weight).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(POKEMON.image);
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('O link deve possuir a URL /pokemons/id, onde o id é do pokemon exibido', () => {
    renderWithRouter(<Pokemon pokemon={ POKEMON } isFavorite />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    const id = Number(linkDetails.href.replace(/\D/g, ''));
    expect(id).toBe(POKEMON.id);
  });

  test('Ao clicar no link, redireciona para a página de detalhes de pokemon', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ POKEMON } isFavorite showDetailsLink />,
    );
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokemons favoritados', () => {
    renderWithRouter(
      <Pokemon pokemon={ POKEMON } isFavorite showDetailsLink />,
    );
    const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toContain('/star-icon.svg');
    expect(favIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
