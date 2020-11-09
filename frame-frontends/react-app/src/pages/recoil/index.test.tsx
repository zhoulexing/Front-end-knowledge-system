import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './index';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});