import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';
import '@testing-library/jest-dom/extend-expect';

describe('Header component', () => {
  test('renders logo image', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByAltText('logo')).toMatchSnapshot();
  });

  test('renders header title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText("Space Travelers' Hub")).toMatchSnapshot();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('Rockets')).toMatchSnapshot();
    expect(screen.getByText('Missions')).toMatchSnapshot();
    expect(screen.getByText('My Profile')).toMatchSnapshot();
  });

  test('renders active navigation link', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('Rockets')).toMatchSnapshot();
    expect(screen.getByText('Missions')).toMatchSnapshot();
    expect(screen.getByText('My Profile')).toMatchSnapshot();
  });
});
