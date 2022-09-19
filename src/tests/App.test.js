import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testes do componente App', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('É redirecionado para a página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('É redirecionado para a página de About, na URL /about ao clicar no About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/about');
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('É redirecionado para a página de Fav, na URL /favorites ao clicar no Fav', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkFavorite);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorites');
    const title = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('É redirecionado para a página NotFound se a URL for inválida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina/que-nao-existe/');
    });
    const title = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
