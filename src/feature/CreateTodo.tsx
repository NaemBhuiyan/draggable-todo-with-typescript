import { Button, Col, Form, Input, Row } from 'antd';
// import useTodoContext from '../hooks/useTodoContext';
import { Action } from '../reducer/todoReducer';

type Props = {
  dispatch: React.Dispatch<Action>;
};

type SubmitValues = {
  todoText: string;
  id?: string;
};

const CreateTodo = ({ dispatch }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: SubmitValues) => {
    dispatch({
      type: 'ADD',
      payload: {
        id: Math.random().toString(),
        todo: values.todoText,
        isDone: false,
      },
    });
    form.resetFields();
  };

  return (
    <Row
      justify='center'
      style={{
        marginTop: '10px',
      }}>
      <Col span={10}>
        <Form
          autoComplete='off'
          form={form}
          name='todo-create'
          size='large'
          className='w-100'
          onFinish={handleSubmit}>
          <Row justify='space-between'>
            <Col span={19}>
              <Form.Item
                name='todoText'
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <Input className='w-100' placeholder='Enter a todo' />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button htmlType='submit' type='primary'>
                  Create
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateTodo;
