import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../utils/renderWithRouter';

describe('Testes do componente <PokemonDetails', () => {
  it('Testa se as informações detalhadas do pokemon são mostradas na tela', () => {
    RenderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    expect(linkDetails).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(h2).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });

  it('Testa se existe na página os mapas contendo as localizações do pokemon', () => {
    RenderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const h2Location = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(h2Location).toBeInTheDocument();

    const img = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    const src = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(img[1].src).toBe(src);
  });

  it('Testa se é possivel favoritar um pokémon através da página de detalhes', () => {
    RenderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();

    const label = screen.getByText(/pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();
  });
});
