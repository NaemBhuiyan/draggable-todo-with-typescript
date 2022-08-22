import { useReducer } from 'react';
import TodoContext from '../context/TodoContext';
import todoReducer, { initialState } from '../reducer/todoReducer';

type Prop = {
  children: JSX.Element;
};

const Todo = ({ children }: Prop) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const testVariable = 'Hi I am test value';

  const context = { testVariable };

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
};

export default Todo;
