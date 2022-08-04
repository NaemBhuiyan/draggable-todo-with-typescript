import './App.css';
import { Layout } from 'antd';
import CreateTodo from './feature/CreateTodo';
// import TodoProvider from './provider/TodoProvider';
import TodoList from './feature/TodoList';
import { useReducer } from 'react';
import todoReducer, { initialState } from './reducer/todoReducer';

const { Header, Footer, Content } = Layout;

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <Layout className='App'>
      <Header>Header</Header>
      <Content>
        <CreateTodo dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
