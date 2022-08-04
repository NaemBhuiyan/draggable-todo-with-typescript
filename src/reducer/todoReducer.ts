import { Todo } from '../model';

export type Action = {
  type: 'EDIT' | 'DELETE' | 'DONE' | 'ADD';
  payload: Todo;
};

export const initialState = [];

const todoReducer = (state: Todo[], action: Action): Todo[] => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return [...state, payload];
    case 'DELETE':
      return state.filter((todo) => todo.id !== payload.id);
    case 'EDIT':
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, ...payload };
        }
        return todo;
      });

    case 'DONE':
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, isDone: payload.isDone };
        }
        return todo;
      });

    default:
      return state;
  }
};

export default todoReducer;
