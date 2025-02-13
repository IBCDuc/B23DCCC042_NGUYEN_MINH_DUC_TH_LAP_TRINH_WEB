import React, { useState } from 'react';
import { List, Input, Button, Checkbox, Space, Modal, Card } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTask.title.trim() && newTask.content.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTask.title,
          content: newTask.content,
          completed: false,
        },
      ]);
      setNewTask({ title: '', content: '' });
      setIsModalOpen(false);
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Thêm Task
      </Button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 20 }}>
        {todos.map((todo) => (
          <Card key={todo.id} title={todo.title} style={{ width: '22%', minHeight: 150 }}>
            {/* <Checkbox checked={todo.completed} onChange={() => toggleStatus(todo.id)} /> */}
            <p>{todo.content}</p>
            <Button icon={<EditOutlined />} style = {{marginRight: '5px', marginLeft: '160px'}} onClick={() => setEditingId(todo.id)} />
            <Button icon={<DeleteOutlined />} danger onClick={() => deleteTodo(todo.id)} />
          </Card>
        ))}
      </div>

      {/* Popup nhập task */}
      <Modal
        title="Thêm Task"
        visible={isModalOpen}
        onOk={addTodo}
        onCancel={() => setIsModalOpen(false)}
        >

        <Input
          placeholder="Nhập tiêu đề"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          placeholder="Nhập nội dung"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default TodoList;
