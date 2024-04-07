import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders Task Management App text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/Task Management App/i);
    expect(headerElement).toBeInTheDocument();
  });
});