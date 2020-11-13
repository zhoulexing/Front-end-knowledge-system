import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from './index';
import {RecoilRoot} from 'recoil';

test('renders learn react link', () => {
  render(<RecoilRoot><Test /></RecoilRoot>);
  const linkElement = screen.getByText(/count/i);
  expect(linkElement).toBeInTheDocument();
});