import { Col, Divider, Row, Space, Typography } from 'antd';
import React from 'react';
import TodoCard from '../component/TodoCard';
import { Todo } from '../model';
import { Action } from '../reducer/todoReducer';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

type Props = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

const TodoList = ({ todos, dispatch }: Props) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const draggedCard = todos.find((todo) => todo.id === result.draggableId);

    // Source Logic
    if (source.droppableId === 'TodoList') {
      dispatch({
        type: 'DONE',
        payload: { ...draggedCard, isDone: false },
      });
    } else {
      dispatch({
        type: 'DONE',
        payload: { ...draggedCard, isDone: true },
      });
    }

    // Destination Logic
    if (destination.droppableId === 'CompleteTodoList') {
      dispatch({
        type: 'DONE',
        payload: { ...draggedCard, isDone: true },
      });
    } else {
      dispatch({
        type: 'DONE',
        payload: { ...draggedCard, isDone: false },
      });
    }
  };
  console.log(todos);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row justify='space-around'>
        <Col span={10}>
          <Droppable droppableId='TodoList'>
            {(provided, snapshot) => (
              <div
                className={`todos ${
                  snapshot.isDraggingOver ? 'dragactive' : ''
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <Typography.Title className='text-center'>
                  Todo
                </Typography.Title>

                <Space size='large' className='w-100' direction='vertical'>
                  {todos.map((todo, index) => {
                    if (!todo.isDone) {
                      return (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          dispatch={dispatch}
                          index={index}
                        />
                      );
                    }
                    return false;
                  })}
                </Space>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Col>
        <Col>
          <Divider type='vertical' className='h-100'></Divider>
        </Col>
        <Col span={10}>
          <Droppable droppableId='CompleteTodoList'>
            {(provided, snapshot) => (
              <div
                className={`todos ${
                  snapshot.isDraggingOver ? 'dragactive' : ''
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <Typography.Title className='text-center'>
                  Complete
                </Typography.Title>

                <Space size='large' className='w-100' direction='vertical'>
                  {todos.map((todo, index) => {
                    if (todo.isDone) {
                      return (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          dispatch={dispatch}
                          index={index}
                        />
                      );
                    }
                    return false;
                  })}
                </Space>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Col>
      </Row>
    </DragDropContext>
  );
};

export default TodoList;
