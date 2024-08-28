// pages/index.tsx
import React, { useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import styles from '../styles/Home.module.css';

interface Todo {
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low'; // Priority level
  category: 'Personal' | 'Work'; // Category filter
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [category, setCategory] = useState<'Personal' | 'Work'>('Personal'); // Category
  const [filter, setFilter] = useState<'All' | 'Personal' | 'Work'>('All'); // Category filter

  const handleAddTodo = (): void => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false, priority, category }]);
      setInput('');
    }
  };

  const handleRemoveTodo = (index: number): void => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index: number): void => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleSaveEdit = (): void => {
    if (editText.trim() !== '' && editIndex !== null) {
      setTodos(todos.map((todo, i) => 
        i === editIndex ? { ...todo, text: editText } : todo
      ));
      setEditIndex(null);
      setEditText('');
    }
  };

  const handleCompleteTodo = (index: number): void => {
    setTodos(todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditText(e.target.value);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPriority(e.target.value as 'High' | 'Medium' | 'Low');
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCategory(e.target.value as 'Personal' | 'Work');
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value as 'All' | 'Personal' | 'Work');
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    handleAddTodo();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    return todo.category === filter;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task"
        className={styles.input}
      />
      <select value={priority} onChange={handlePriorityChange} className={styles.prioritySelect}>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <select value={category} onChange={handleCategoryChange} className={styles.prioritySelect}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>
      <button onClick={handleClick} className={styles.addButton}>Add</button>
      {editIndex !== null && (
        <div>
          <input
            type="text"
            value={editText}
            onChange={handleEditChange}
            placeholder="Edit task"
            className={styles.input}
          />
          <button onClick={handleSaveEdit} className={styles.editButton}>Save</button>
        </div>
      )}
      <select value={filter} onChange={handleFilterChange} className={styles.prioritySelect}>
        <option value="All">All</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>
      <ul className={styles.ul}>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={`${styles.li} ${todo.completed ? styles.completed : ''}`}>
            <span className={`${styles.priority} ${styles[`priority-${todo.priority}`]}`}>
              {todo.text}
            </span>
            <div>
              <button onClick={() => handleCompleteTodo(index)} className={styles.addButton}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleEditTodo(index)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleRemoveTodo(index)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
