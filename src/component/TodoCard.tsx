import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { Card, Col, Input, Row, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Todo } from '../model';
import { Action } from '../reducer/todoReducer';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<Action>;
  index: number;
};

const TodoCard = ({ todo, dispatch, index }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string | undefined>('');

  const handleDelete = (id?: string) => {
    dispatch({
      type: 'DELETE',
      payload: { id },
    });
  };

  const handleFinish = () => {
    dispatch({
      type: 'EDIT',
      payload: {
        id: todo.id,
        todo: editedText,
        isDone: todo.isDone,
      },
    });
    setIsEdit(false);
  };

  const handleEdit = (todoText?: string) => {
    setEditedText(todoText);
    setIsEdit(true);
  };

  const handleComplete = () => {
    dispatch({
      type: 'DONE',
      payload: {
        id: todo.id,
        todo: todo.todo,
        isDone: !todo.isDone,
      },
    });
  };

  return (
    <Draggable draggableId={todo?.id?.toString() || ''} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {isEdit ? (
            <Row justify='space-between' align='middle'>
              <Col span={18}>
                <Input
                  value={editedText}
                  onChange={({ target }) => setEditedText(target.value)}
                />
              </Col>
              <Col>
                <Space direction='horizontal'>
                  <CloseOutlined onClick={() => setIsEdit(false)} />
                  <CheckOutlined onClick={() => handleFinish()} />
                </Space>
              </Col>
            </Row>
          ) : (
            <Row justify='space-between'>
              <Col>{todo.isDone ? <s>{todo.todo}</s> : todo.todo}</Col>
              <Col>
                <Space direction='horizontal'>
                  <Tooltip
                    title={todo.isDone ? 'Not completed' : 'Complete task'}>
                    {!todo.isDone ? (
                      <CheckOutlined onClick={() => handleComplete()} />
                    ) : (
                      <MinusOutlined onClick={() => handleComplete()} />
                    )}
                  </Tooltip>
                  <DeleteOutlined onClick={() => handleDelete(todo.id)} />
                  {!todo.isDone && (
                    <EditOutlined onClick={() => handleEdit(todo.todo)} />
                  )}
                </Space>
              </Col>
            </Row>
          )}
        </Card>
      )}
    </Draggable>
  );
};

export default TodoCard;
