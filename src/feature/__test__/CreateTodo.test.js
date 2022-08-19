import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTodo from '../CreateTodo';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});


test('create todo input field test', async () => {
  
  render(<CreateTodo />);
  const linkElement = screen.getByRole('button', {
    name: /Create/i,
  });
  expect(linkElement).toBeInTheDocument();
  userEvent.click(linkElement);
  const input = await screen.findByText(/'todotext' is required/i);
  expect(input).toBeInTheDocument();
});

test('input field value', () => { 
  render(<CreateTodo />);
  const El = screen.getByPlaceholderText(/Enter a todo/i);  
  expect(El).toBeInTheDocument();
  userEvent.type(El, 'Hello')
  expect(El).toHaveValue('Hello')
 })