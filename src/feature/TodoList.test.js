import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import userEvent from '@testing-library/user-event';
import todoReducer, { initialState } from '../reducer/todoReducer';

const renderHook = (hook) => {
  let results;
  function HookWrapper() {
    results = useReducer(todoReducer, initialState);

    return null;
  }
  render(<HookWrapper />);
  return results;
};

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
  

  const [todos, dispatch] = renderHook();

  // render(<TodoList todos={todos} dispatch={dispatch} />);

  // const el = screen.getByText(/There is no task/i);

  // expect(el).toBeInTheDocument();
  
  render(
    <TodoList
      todos={[
        {
          id: '123',
          todo: 'Hello',
          isDone: false,
        },
        {
          id: '124',
          todo: 'Here is another task',
          isDone: false,
        },
      ]}
      dispatch={dispatch}
    />
  );

  const todosCard = screen.getAllByTestId('Complete the task');
  expect(todosCard.length).toEqual(2);
});


test('if there is no todos', async () => {
  
  

  const [todos, dispatch] = renderHook();

  
  render(
    <TodoList
      todos={todos}
      dispatch={dispatch}
    />
  );

  const todosCard = screen.getByText(/there is no task/i);
  expect(todosCard).toBeInTheDocument();
});
