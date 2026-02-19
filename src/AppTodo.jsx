import { useState } from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';

function AppTodo(props) {

  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([
    { id:0, text: 'HTML&CSS 공부하기', done: false}
    , { id:1, text: '자바스크립트 공부하기', done: false}
  ])
  const [insertAt, setInsertAt] = useState(todos.length-1);

  const handleAddTodo = () => {
    const nextId = todos.length;
    setTodos([
      ...todos,
      { id: nextId, text: todoText, done: false}
    ])
    setTodoText('');
  }

  const handleAddTodoByIndex = () => {
    const nextId = todos.length;
    const newTodos = [
      ...todos.slice(0, insertAt),
      {id: nextId, text: todoText, done: false},
      ...todos.slice(insertAt)
    ]
    setTodos(newTodos);
    setTodoText('');
  }

  const handleTodoTextChange = (e) => {
    setTodoText(e.target.value);
  }

  const handleDeleteTodo = (deleteId) => {
    const newTodos = todos.filter(item => item.id !== deleteId);
    setTodos(newTodos);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter'){
      handleAddTodo();
    }
  }

  const handleToggleTodo = (id, done) => {
    const nextTodos = todos.map(item => {
      if (item.id === id){
        return {...item, done};
      }
      return item;
    })

    setTodos(nextTodos);
  }

  const handleReverse = () => {
    setTodos(todos.toReversed());
  }

  return (
    <div>
      <h2>할일목록</h2>
      <div>
        <input 
          type="text" 
          value={todoText} 
          onChange={handleTodoTextChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      <div>
        <select value={insertAt} onChange={(e) => setInsertAt(e.target.value)}>
          {todos.map((item, index) => (
            <option key={item.id} value={index}>{index} 번째</option>
          ))}
        </select>
        <button onClick={handleAddTodoByIndex}>{insertAt}번째 추가</button>
      </div>
      <div>
        Preview: {todoText}
      </div>
      <button onClick={handleReverse}>Reverse</button>
      <TodoList 
        todos={todos} 
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
      />
      
    </div>
  );
}

export default AppTodo;