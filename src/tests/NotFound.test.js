import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testes do componente Not Found', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image.src).toBe(IMAGE_URL);
  });
});
