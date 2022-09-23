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
  const tasks = todos.filter((todo) => todo.isDone === false);
  const completeTask = todos.filter((todo) => todo.isDone === true);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row justify='space-around'>
        <Col span={10}>
          <Typography.Title className='text-center'>
            Active task
          </Typography.Title>
          <Droppable droppableId='TodoList'>
            {(provided, snapshot) => (
              <div
                className={`${tasks.length ? '' : 'text-center'}`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {tasks.length ? (
                  <Space size='large' className='w-100' direction='vertical'>
                    {tasks.map((todo, index) => {
                      return (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          dispatch={dispatch}
                          index={index}
                        />
                      );
                    })}
                  </Space>
                ) : (
                  <Typography.Text type='secondary'>
                    <small>There is no tasks</small>
                  </Typography.Text>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Col>
        <Col>
          <Divider type='vertical' className='h-100'></Divider>
        </Col>
        <Col span={10}>
          <Typography.Title className='text-center'>Complete</Typography.Title>
          <Droppable droppableId='CompleteTodoList'>
            {(provided, snapshot) => (
              <div
                className={`${completeTask.length ? '' : 'text-center'}`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {completeTask.length ? (
                  <Space size='large' className='w-100' direction='vertical'>
                    {completeTask.map((todo, index) => {
                      return (
                        <TodoCard
                          key={todo.id}
                          todo={todo}
                          dispatch={dispatch}
                          index={index}
                        />
                      );
                    })}
                  </Space>
                ) : (
                  <Typography.Text type='secondary'>
                    <small>There is no completed task</small>
                  </Typography.Text>
                )}
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
