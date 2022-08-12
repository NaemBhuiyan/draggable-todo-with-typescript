import { useContext } from 'react';
import TodoContext from '../context/TodoContext';

const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error(
      "Todo context provider not found, make sure you're using  components correctly."
    );
  }

  return context;
};

export default useTodoContext;
